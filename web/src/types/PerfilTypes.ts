export type Error = {
  error?: [string]
  name?: [string]
  cpf?: [string]
  email?: [string]
  password?: [string]
}

export type User = {
  id: string
  name: string
  cpf: string
  email: string
  password: string
  confirmPassword: string
  role: string
}
