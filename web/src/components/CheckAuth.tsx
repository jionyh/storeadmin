import { CheckAuthUser } from '@/utils/CheckAuth'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'

type Props = {
  children: ReactElement
}

export const CheckAuth = ({ children }: Props) => {
  const { push } = useRouter()
  const isAuth = CheckAuthUser()

  useEffect(() => {
    if (!isAuth) push('/login')
  }, [isAuth, push])

  return (
    <>
      {!isAuth && null}
      {isAuth && children}
    </>
  )
}
