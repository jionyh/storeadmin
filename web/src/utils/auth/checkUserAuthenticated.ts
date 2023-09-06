import cookies from 'js-cookie'
export const checkUserAuthenticated = () => {
  const userToken = cookies.get('token')

  return !!userToken
}
