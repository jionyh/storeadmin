import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'

export async function getAuthToken() {
  try {
    const res = await getServerSession(authOptions)
    if (!res) return ''
    return res.user.token
  } catch (e) {
    return ''
  }
}

export const API_URL = 'http://localhost:4001'
/* export const fetchOptions = {
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    Cookie: `authToken=${authToken}`,
  },
} */
