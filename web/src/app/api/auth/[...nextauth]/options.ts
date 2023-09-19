/* eslint-disable @typescript-eslint/no-explicit-any */
import { getLogin } from '@/utils/api'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import Cookies from 'js-cookie'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 8, // 8 horas
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
          throw new Error('invalid Credentials')
        }

        const { email, password } = credentials

        return getLogin({ email, password }).then((response) => {
          if (response.success) {
            return response
          } else {
            throw new Error(response.error)
          }
        })
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
