import { useQuery } from '@tanstack/react-query'
import { AllCostResponse, AllCostParams } from '@/types/costTypes'
import { costApi } from '../api/costs'

export const useCosts = (params?: AllCostParams) => {
  const costs = useQuery({
    queryKey: ['costs', { params }],
    queryFn: () => costApi.getAllCosts(params),
    staleTime: 60 * 60 * 3, // 3minutes
  })

  const returnData = {
    data: costs.data as AllCostResponse,
    isLoading: costs.isLoading,
    isError: costs.isError,
  }
  return returnData
}
