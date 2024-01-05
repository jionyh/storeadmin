import { baseUrl } from '@/utils/fetchOptions'

export const cashflowReport = async (authToken: string | undefined) => {
  try {
    const result = await fetch(`${baseUrl}/cashflow`, {
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
