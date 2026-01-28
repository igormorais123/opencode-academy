import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // YouTube Provider (usa OAuth do Google com escopos do YouTube)
    GoogleProvider({
      id: "youtube",
      name: "YouTube",
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid email profile https://www.googleapis.com/auth/youtube.readonly",
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
        // Buscar dados extras do usuario
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: {
            role: true,
            preferredOs: true,
          },
        })
        if (dbUser) {
          session.user.role = dbUser.role
          session.user.preferredOs = dbUser.preferredOs
        }
      }
      return session
    },
    async signIn({ user, account }) {
      // Registrar login (apenas se o usuario ja existe no banco)
      if (user.id) {
        try {
          // Verificar se usuario existe antes de criar log
          const existingUser = await prisma.user.findUnique({
            where: { id: user.id },
          })

          if (existingUser) {
            await prisma.loginLog.create({
              data: {
                userId: user.id,
                email: user.email || "",
                name: user.name,
              },
            })

            // Verificar se e admin
            if (user.email === process.env.ADMIN_EMAIL) {
              await prisma.user.update({
                where: { id: user.id },
                data: { role: "ADMIN" },
              })
            }
          }
        } catch (error) {
          console.error("Erro ao registrar login:", error)
        }
      }
      return true
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "database",
  },
}
