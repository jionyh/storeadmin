'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'

const useLogin = () => {
  const [hasError, setHasError] = useState<string | null>(null)

  const login = async (email: string, password: string) => {
    setHasError(null)
    try {
      const loginResponse = await signIn('credentials', {
        redirect: false,
        email,
        password,
        callbackUrl: `/`,
      })

      if (!loginResponse?.error && loginResponse?.ok) {
        return true
      }
      // router.push(
      setHasError(loginResponse!.error)
    } catch (error) {
      // Handle any errors that occur during the login process
    }
  }

  return { login, hasError }
}

export default useLogin
