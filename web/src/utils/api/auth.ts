import { api } from '@/lib/axios'
import { LoginResponse } from '@/types/loginTypes'
import axios from 'axios'

export const getLogin = async (data: {
  email: string
  password: string
}): Promise<LoginResponse> => {
  try {
    const res = await fetch('https://api.jiony.dev/signin', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const json = await res.json()

    const authCookie = res.headers
      .get('set-cookie')
      ?.split(';')
      .find((cookie) => cookie.trim().startsWith('authToken='))
      ?.split('=')[1]

    console.log(json)
    return {
      success: json.success,
      user: {
        ...json.user,
        token: authCookie,
      },
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data
    } else {
      throw new Error('Failed to fetch login')
    }
  }
}
