import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import { loginUser } from "@/app/actions/auth";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
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
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),

    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID || "",
      clientSecret: process.env.APPLE_CLIENT_SECRET || "",
    }),
  ],

  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/auth/error",
  },

  callbacks: {
    async jwt({ token, user, account }) {
      // For credentials login
      if (user && account?.provider === "credentials") {
        token.id = user.id;
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }

      // For Google login
      if (account?.provider === "google" && user?.email) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: user.name,
              email: user.email,
              profilePhoto: user.image,
              gLogin: true,
            }),
          });

          const data = await res.json();

          if (res.ok) {
            token.id = data.data.user._id;
            token.role = data.data.user.role;
            token.accessToken = data.data.token.accessToken;
            token.refreshToken = data.data.token.refreshToken;
          } else {
            console.error("Google login failed:", data);
          }
        } catch (error) {
          console.error("Error contacting backend during Google login:", error);
        }
      }

      // For Apple login
      if (account?.provider === "apple" && user?.email) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: user.name,
              email: user.email,
              profilePhoto: user.image,
              appleLogin: true,
            }),
          });

          const data = await res.json();

          if (res.ok) {
            token.id = data.data.user._id;
            token.role = data.data.user.role;
            token.accessToken = data.data.token.accessToken;
            token.refreshToken = data.data.token.refreshToken;
          } else {
            console.error("Apple login failed:", data);
          }
        } catch (error) {
          console.error("Error contacting backend during Apple login:", error);
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.accessToken = token.accessToken as string;
        session.user.refreshToken = token.refreshToken as string;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
