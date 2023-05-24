import Cookies from 'js-cookie'

export const CheckAuthUser = () => {
  const cookie = Cookies.get('token')

  return cookie
}
