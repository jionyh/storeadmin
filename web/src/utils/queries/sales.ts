import { AllSalesParams, AllSalesResponse } from './../../types/saleTypes'
import { useQuery } from '@tanstack/react-query'
import { salesApi } from '../api/sales'

export const useSales = (params?: AllSalesParams) => {
  const sales = useQuery({
    queryKey: ['sales', { params }],
    queryFn: () => salesApi.getAllSales(params),
    staleTime: 60 * 60 * 3, // 3minutes
  })

  const returnData = {
    data: sales.data as AllSalesResponse,
    isLoading: sales.isLoading,
    isError: sales.isError,
  }
  return returnData
}
