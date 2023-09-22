import { useQuery } from '@tanstack/react-query'
import { paymentMethodsApi } from '../api/paymentMethods'
import { PaymentResponseSuccess } from '@/types/paymentTypes'

export const usePayments = () => {
  const payments = useQuery({
    queryKey: ['paymentsMethods'],
    queryFn: () => paymentMethodsApi.getAllPaymentsMethods(),
    staleTime: Infinity
  })

  const returnData = {
    data: payments.data as PaymentResponseSuccess,
    isLoading: payments.isLoading,
    isError: payments.isError,
  }

  return returnData
}
