import { ResponseError } from './commonsTypes'

type LoginResponseSuccess = {
  success: true
  user: {
    name: string
    email: string
    role: string
    token: string
  }
}

export type LoginResponse = LoginResponseSuccess | ResponseError
