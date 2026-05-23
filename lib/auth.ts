// import NextAuth from "next-auth"
// import Credentials from "next-auth/providers/credentials"
// import { supabase } from "./supabase"
// import bcrypt from "bcryptjs"
// import {z as zod} from "zod"

// const credentialsSchema = zod.object({
//   email: zod.string().email(),
//   password: zod.string().min(6)
// })

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   providers: [
//     Credentials({
//       credentials: {
//         email: {},
//         password: {}
//       },
//       async authorize(credentials) {
//         const parsedCredentials = credentialsSchema.safeParse(credentials)

//         if (!parsedCredentials.success) return null

//         const { data: user } = await supabase
//           .from("users")
//           .select("*")
//           .eq("email", parsedCredentials.data.email)
//           .single()

//         if (!user) return null

//         const isValid = await bcrypt.compare(
//           parsedCredentials.data.password,
//           user.password
//         )

//         if (!isValid) return null

//         return {
//           id: user.id,
//           email: user.email,
//           name: user.name,
//           role: user.role,
//           fish_cash: user.fish_cash
//         }
//       }
//     })
//   ],
//   session: {
//     strategy: "jwt"
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.role = user.role
//         token.fish_cash = user.fish_cash
//       }
//       return token
//     },
//     async session({ session, token }) {
//         if (session.user) {
//             session.user.role = token.role
//             session.user.fish_cash = token.fish_cash
//         }
//       return session
//     }
//   }
// })


import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { supabase } from "./supabase"
import bcrypt from "bcryptjs"
import { z } from "zod"

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const authConfig = {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials)

        if (!parsed.success) return null

        const { email, password } = parsed.data

        const { data: user } = await supabase
          .from("users")
          .select("*")
          .eq("email", email)
          .single()

        if (!user) return null

        const isValid = await bcrypt.compare(password, user.password)

        if (!isValid) return null

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          fish_cash: user.fish_cash,
        }
      },
    }),
  ],
  session: { strategy: "jwt" as const},
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.fish_cash = user.fish_cash
      }
      return token
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id
        session.user.role = token.role
        session.user.fish_cash = token.fish_cash
      }
      return session
    },
  },
}

export const { handlers } = NextAuth(authConfig)