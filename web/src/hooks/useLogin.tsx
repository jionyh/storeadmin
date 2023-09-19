'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { setCookie, hasCookie } from 'cookies-next'
import { signIn, useSession, getSession } from 'next-auth/react'

const useLogin = () => {
  const router = useRouter()
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
      const userToken = await getSession()

      if (!loginResponse?.error && userToken?.user.login.success) {
        const cookie = hasCookie('token')

        if (!cookie) {
          setCookie('token', userToken.user.login.token, {
            maxAge: 60 * 60 * 8, // 8 horas
            path: '/', // Use this for cross-site cookies
          })
          const cookieAdd = hasCookie('token')
          if (cookieAdd) {
            return true
          }
          return
        }
        router.push('/')
      }
      setHasError(loginResponse!.error)
    } catch (error) {
      // Handle any errors that occur during the login process
    }
  }

  return { login, hasError }
}

export default useLogin
