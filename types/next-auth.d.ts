import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      role: string
      fish_cash: number
    }
  }

  interface User {
    id: string
    role: string
    fish_cash: number
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string
    fish_cash: number
  }
}