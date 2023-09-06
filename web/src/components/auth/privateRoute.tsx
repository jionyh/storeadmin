/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { APP_ROUTES } from '@/constants/app-routes'
import { checkUserAuthenticated } from '@/utils/auth/checkUserAuthenticated'
import { useParams, useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

type Props = {
  children: ReactNode
}
export const PrivateRoute = ({ children }: Props) => {
  const { push } = useRouter()
  const params = useParams()

  const isUserAuthenticated = checkUserAuthenticated()

  useEffect(() => {
    if (!isUserAuthenticated) {
      push(APP_ROUTES.public.login)
    }
  }, [isUserAuthenticated, push])

  return (
    <>
      {!isUserAuthenticated && null}
      {isUserAuthenticated && children}
    </>
  )
}
