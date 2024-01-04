import { baseUrl, fetchOptions } from '@/utils/fetchOptions'

export const cashflowReport = async () => {
  try {
    const result = await fetch(`${baseUrl}/cashflow`, fetchOptions)

    if (!result.ok) throw new Error('Failed to fetch data!')

    return result.json()
  } catch (error) {
    console.log(error)
    return 'failed to fetch data!'
  }
}
