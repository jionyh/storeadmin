import { Context } from '@/contexts/UserContext'
import api from '@/libs/axios'
import { CheckAuthUser } from '@/utils/CheckAuth'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { ReactElement, useContext, useEffect } from 'react'
import { Loader } from './Loader'
import { useDisclosure } from '@chakra-ui/react'

type Props = {
  children: ReactElement
}

export const CheckAuth = ({ children }: Props) => {
  const { push } = useRouter()
  const isAuth = CheckAuthUser()

  const { state, dispatch } = useContext(Context)
  const loader = useDisclosure()

  const getUserInfo = async () => {
    if (isAuth) {
      const token = Cookies.get('token')
      if (state.user.token === '') {
        loader.onOpen()
        const res = await api.post('/user', { token })
        if (res.status === 200) {
          dispatch({ type: 'change_state', payload: res.data.data })
          loader.onClose()
        }
      }
    }
  }

  useEffect(() => {
    if (!isAuth) push('/login')
    if (isAuth) {
      getUserInfo()
    }
  }, [isAuth, push])

  return (
    <>
      {!isAuth && null}
      {isAuth && state.user.token !== '' ? children : <Loader obj={loader} />}
    </>
  )
}
