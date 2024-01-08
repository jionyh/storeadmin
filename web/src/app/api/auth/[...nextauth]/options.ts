/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthUser } from '@/types/AuthLoginTypes'
import { getLogin } from '@/utils/api/auth'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { cookies } from 'next/headers'

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
      async authorize(credentials, req): Promise<any> {
        if (!credentials?.email && !credentials?.password) {
          throw new Error('invalid Credentials')
        }
        const { email, password } = credentials
        const response = await getLogin({ email, password })
        if (!response) throw new Error('failed to fetch login')
        if (!response.success) throw new Error(response.error)
        return response.user
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user
      }
      return token
    },
    async session({ token, session }) {
      if (token) {
        session.user = token.user as AuthUser
      }
      return session
    },
  },
}
