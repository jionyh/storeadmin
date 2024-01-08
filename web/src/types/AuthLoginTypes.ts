export interface AuthUser {
  name: string
  email: string
  role: string
  token: string
}

export interface AuthLogin {
  success: boolean
  user: AuthUser
}
