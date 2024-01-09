import { LoginResponse } from '@/types/loginTypes'
import axios from 'axios'
import { API_URL } from '../fetchOptions'
import { api } from '@/lib/axios'

export const getLogin = async (data: {
  email: string
  password: string
}): Promise<LoginResponse> => {
  try {
    // request login para o axios pegar o token
    await api.post('/signin', data)
    // request login do fetch para pegar o token
    const res = await fetch(`${API_URL}/signin`, {
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
