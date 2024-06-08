import { API_URL } from '@/utils/fetchOptions'
import { cookies } from 'next/headers'

export const cashflowReport = async () => {
  'use server'
  const authToken = cookies().get('authToken')?.value
  console.log('cashFlowFn =>', authToken)
  console.log('cookies =>', cookies().getAll())
  try {
    const result = await fetch(`${API_URL}/cashflow`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `authToken=${authToken}`,
      },
      cache: 'no-store',
    })

    if (!result.ok) throw new Error('Failed to fetch data!')

    return result.json()
  } catch (error) {
    console.log(error)
    return 'failed to fetch data!'
  }
}
