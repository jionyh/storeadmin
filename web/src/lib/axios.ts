import axios from 'axios'
import { getCookie } from 'cookies-next'

//const baseURL = 'https://api.jiony.dev'
const baseURL = 'http://localhost:4001'
const isServer = typeof window === 'undefined'

export const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

/* api.interceptors.request.use(
  (config) => {
    config.withCredentials = true
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
 */
/* api.interceptors.request.use(async (config) => {
  if (isServer) {
    const { cookies } = await import('next/headers')
    const token = cookies().get('token')?.value

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  } else {
    const token = getCookie('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }

  return config
}) */
