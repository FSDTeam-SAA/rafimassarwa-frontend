import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import AzureADProvider from "next-auth/providers/azure-ad"; // ✅ Correct for Azure AD
import { loginUser } from "@/app/actions/auth";
import jwt from "jsonwebtoken";

function generateAppleClientSecret() {
  const privateKey = (process.env.APPLE_PRIVATE_KEY || "").replace(
    /\\n/g,
    "\n"
  );

  return jwt.sign({}, privateKey, {
    algorithm: "ES256",
    keyid: process.env.APPLE_KEY_ID,
    issuer: process.env.APPLE_TEAM_ID, // Apple Team ID
    audience: "https://appleid.apple.com",
    subject: process.env.APPLE_CLIENT_ID, // Service ID (clientId)
    expiresIn: "180d", // max 6 months
  });
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        rememberMe: { label: "Remember Me", type: "checkbox" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const result = await loginUser({
          email: credentials.email,
          password: credentials.password,
        });

        if (!result.success) {
          throw new Error(result.message || "Invalid credentials");
        }

        return {
          id: result.data.user._id,
          name: result.data.user.userName,
          email: result.data.user.email,
          role: result.data.user.role,
          accessToken: result.data.token.accessToken,
          refreshToken: result.data.token.refreshToken,
          rememberMe: credentials.rememberMe === "on",
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),

    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID!,
      clientSecret: generateAppleClientSecret(),
      authorization: {
        params: {
          scope: "name email",
          response_mode: "query",
        },
      },
    }),

    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID || "",
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET || "",
      tenantId: process.env.AZURE_AD_TENANT_ID || "common", // Use 'common' for multi-tenant
    }),
  ],

  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/auth/error",
  },

  callbacks: {
    async jwt({ token, user, account }) {
      if (user && account?.provider === "credentials") {
        token.id = user.id;
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.rememberMe = user.rememberMe;

        const now = Math.floor(Date.now() / 1000);
        token.exp = user.rememberMe
          ? now + 30 * 24 * 60 * 60
          : now + 24 * 60 * 60;
      }

      if (account?.provider === "google" && user?.email) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: user.name,
                email: user.email,
                profilePhoto: user.image,
                gLogin: true,
              }),
            }
          );

          const data = await res.json();

          if (res.ok) {
            token.id = data.data.user._id;
            token.role = data.data.user.role;
            token.accessToken = data.data.token.accessToken;
            token.refreshToken = data.data.token.refreshToken;
            token.exp = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60;
          } else {
            console.error("Google login failed:", data);
          }
        } catch (error) {
          console.error("Error contacting backend during Google login:", error);
        }
      }

      if (account?.provider === "apple" && user?.email) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: user.name,
                email: user.email,
                profilePhoto: user.image,
                gLogin: true,
              }),
            }
          );

          const data = await res.json();

          if (res.ok) {
            token.id = data.data.user._id;
            token.role = data.data.user.role;
            token.accessToken = data.data.token.accessToken;
            token.refreshToken = data.data.token.refreshToken;
            token.exp = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60;
          } else {
            console.error("Apple login failed:", data);
          }
        } catch (error) {
          console.error("Error contacting backend during Apple login:", error);
        }
      }

      if (account?.provider === "azure-ad" && user?.email) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: user.name,
                email: user.email,
                profilePhoto: user.image,
                gLogin: true,
              }),
            }
          );

          const data = await res.json();

          if (res.ok) {
            token.id = data.data.user._id;
            token.role = data.data.user.role;
            token.accessToken = data.data.token.accessToken;
            token.refreshToken = data.data.token.refreshToken;
            token.exp = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60;
          } else {
            console.error("Azure AD login failed:", data);
          }
        } catch (error) {
          console.error(
            "Error contacting backend during Azure AD login:",
            error
          );
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.rememberMe = token.rememberMe;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },

  secret: process.env.NEXTAUTH_SECRET,
  cookies: {
    sessionToken: {
      name: `${
        process.env.NODE_ENV === "production"
          ? "__Secure-next-auth.session-token"
          : "next-auth.session-token"
      }`,
      options: {
        httpOnly: true,
        sameSite: "lax", // or 'strict'
        path: "/",
        secure: process.env.NODE_ENV === "production", // ✅ only true in production
      },
    },
  },
});

export { handler as GET, handler as POST };
