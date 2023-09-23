import { UnitsResponse } from '@/types/productTypes'
import { useQuery } from '@tanstack/react-query'
import { unitApi } from '../api/units'

export const useUnits = () => {
  const units = useQuery({
    queryKey: ['units'],
    queryFn: () => unitApi.getAllUnits(),
    staleTime: Infinity,
  })

  

  const returnData = {
    data: units.data as UnitsResponse,
    isLoading: units.isLoading,
    isError: units.isError,
  }

  return returnData
}
