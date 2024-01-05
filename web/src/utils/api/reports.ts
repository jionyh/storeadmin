import { baseUrl } from '@/utils/fetchOptions'
import { cookies } from 'next/headers'

export const cashflowReport = async () => {
  const authToken = cookies().get('authToken')?.value
  try {
    const result = await fetch(`${baseUrl}/cashflow`, {
      credentials: 'include',
      headers: {
        Cookie: `authToken=${authToken}`,
      },
    })

    if (!result.ok) throw new Error('Failed to fetch data!')

    return result.json()
  } catch (error) {
    console.log(error)
    return 'failed to fetch data!'
  }
}
