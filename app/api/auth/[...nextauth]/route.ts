export const runtime = "nodejs"

import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
// import { PrismaClient } from "@prisma/client"
import { prisma } from "@/app/lib/prisma"

// const prisma = new PrismaClient()

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "database",
  },
})

export { handler as GET, handler as POST }
