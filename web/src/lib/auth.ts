/* eslint-disable @typescript-eslint/no-explicit-any */
import { getLogin } from '@/utils/api'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<any> {
        if (!credentials?.email && !credentials?.password) {
          return null
        }

        const { email, password } = credentials

        console.log({ email, password })

        const login = await getLogin({ email, password })

        if (login.success) {
          return login
        } else {
          throw new Error(login.error)
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.login = user
      }
      return token
    },

    async session({ session, token }) {
      if (token) {
        session.user.login = token.login
      }

      return session
    },
  },
}
