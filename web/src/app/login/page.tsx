/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useRef, useState } from 'react'
import useLogin from '@/hooks/useLogin'
import { Loader } from '@/components/Loader'
import { useRouter } from 'next/navigation'
import { Logo } from '@/components/ui/logo'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { InputLogin } from '@/components/InputLogin'
import { Separator } from '@/components/ui/separator'
import { getLogin } from '@/utils/api/auth'
import { useSession } from 'next-auth/react'

export default function Login() {
  const emailRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const { login, hasError } = useLogin()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { status } = useSession()

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    e.preventDefault()
    const email = emailRef.current?.value || ''
    const password = passwordRef.current?.value || ''
    const loggedUser = await login(email, password)
    if (loggedUser) {
      await getLogin({ email, password })
      router.push('/')
    }
    setLoading(false)
  }

  if (status === 'authenticated') {
    router.push('/')
  }

  return (
    <div className="mx-10 my-auto">
      {status === 'unauthenticated' && (
        <>
          {loading && <Loader visible />}
          <Card className="flex flex-col items-center justify-center p-7">
            <Logo />
            <CardContent>
              <form
                onSubmit={handleFormSubmit}
                className="my-7 flex w-full flex-col items-center justify-center gap-5"
              >
                <InputLogin ref={emailRef} placeholder="Digite o email" />
                <InputLogin
                  ref={passwordRef}
                  password
                  placeholder="Digite a senha"
                />
                {hasError && (
                  <p className="w-full rounded bg-destructive/40 p-1 text-center text-sm text-destructive">
                    {hasError}
                  </p>
                )}
                <Button disabled={loading} className="w-full">
                  Fazer login
                </Button>
              </form>
              <Separator />
              <div className="mt-7 flex w-full flex-col items-center justify-end gap-1">
                <p className="text-bold">Esqueceu a senha?</p>
                <Button className="w-full" variant="destructive" size="sm">
                  Recuperar
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
