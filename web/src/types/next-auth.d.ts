// import NextAuth from 'next-auth'
// import { JWT } from 'next-auth/jwt'
import { AuthLogin } from './AuthLoginTypes'

declare module 'next-auth' {
  interface Session {
    user: {
      login: AuthLogin
    }
  }
}

declare module 'next-auth' {
  export interface User extends AuthLogin {
    _id?: string
    firstname?: string
    lastname?: string
    username?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    login: AuthLogin
  }
}
