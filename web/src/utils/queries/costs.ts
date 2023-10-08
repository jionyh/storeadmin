import { useQuery } from '@tanstack/react-query'
import {
  AllCostResponse,
  AllCostParams,
  SingleCostResponse,
} from '@/types/costTypes'
import { costApi } from '../api/costs'

export const useCosts = (params?: AllCostParams) => {
  const costs = useQuery({
    queryKey: ['costs', params],
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

export const useGetSingleCosts = (id: number) => {
  const costs = useQuery({
    queryKey: ['costs', { id }],
    queryFn: () => costApi.getCost(id),
    //staleTime: 60 * 60 * 3, // 3minutes
  })

  const returnData = {
    data: costs.data as SingleCostResponse,
    isLoading: costs.isLoading,
    isError: costs.isError,
    isFetching: costs.isFetching
  }
  return returnData
}
