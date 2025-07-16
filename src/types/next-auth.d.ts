import type { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: string
      accessToken: string
      refreshToken: string
      rememberMe: boolean
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    name: string
    email: string
    role: string
    rememberMe: boolean
    accessToken: string
    refreshToken: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: string
    accessToken: string
    refreshToken: string
    rememberMe: boolean
  }
}
