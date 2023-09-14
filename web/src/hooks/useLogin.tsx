'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { setCookie, getCookie, hasCookie } from 'cookies-next'
import { signIn, useSession } from 'next-auth/react'

const useLogin = () => {
  const router = useRouter()
  const token = useSession()
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
      if (!loginResponse?.error && token.status === 'authenticated') {
        const cookie = hasCookie('token')

        if (!cookie) {
          setCookie('token', token.data.user.login.token, {
            maxAge: 60 * 60 * 8, // 8 horas
            path: '/', // Use this for cross-site cookies
          })
          const cookieAdd = hasCookie('token')
          if (cookieAdd) {
            router.push('/')
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
