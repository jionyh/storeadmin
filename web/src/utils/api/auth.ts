import { api } from '@/lib/axios'
import { LoginResponse } from '@/types/loginTypes'
import axios from 'axios'

export const getLogin = async (data: {
  email: string
  password: string
}): Promise<LoginResponse> => {
  try {
    const result = await api.post('/signin', data)
    return result.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data
    } else {
      throw new Error('Failed to fetch login')
    }
  }
}
