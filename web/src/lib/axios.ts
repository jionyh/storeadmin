import axios from 'axios'
import { getCookie } from 'cookies-next'

const baseURL = 'https://api.jiony.dev'
const isServer = typeof window === 'undefined'

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(async (config) => {
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
})
