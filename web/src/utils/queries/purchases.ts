import { useQuery } from '@tanstack/react-query'
import { AllPurchaseResponse, AllPurchasesParams } from '@/types/purchaseTypes'
import { purchaseApi } from '../api/purchases'

export const usePurchases = (params?: AllPurchasesParams) => {
  const purchases = useQuery({
    queryKey: ['purchases', { params }],
    queryFn: () => purchaseApi.getAllPurchases(params),
    staleTime: 60 * 60 * 3, // 3minutes
  })

  const returnData = {
    data: purchases.data as AllPurchaseResponse,
    isLoading: purchases.isLoading,
    isError: purchases.isError,
  }
  return returnData
}
