import { useToast } from "@/components/ui/use-toast"
import { ErrorResponse } from "@/types/errorTypes"

import { costApi } from "@/utils/api/costs"
import { purchaseApi } from "@/utils/api/purchases"
import { salesApi } from "@/utils/api/sales"

import { queryClient } from "@/utils/queryClient"
import { useState } from "react"

type deleteParams = {
  endpoint: 'costs' | 'sales' | 'purchases'
  activeId: number
  date: string
  period: 'day' | 'week' | 'month'
}

type ConfigTypes = {
  endpoint: (id:number)=>Promise<ErrorResponse>
  name: string
}

function useDelete ({
  endpoint,
  activeId,
  date,
  period
}:deleteParams){
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const {toast} = useToast()
  let deleteConfig:ConfigTypes = {
    endpoint: costApi.deleteCost,
    name: 'despesa'
  }  

  switch(endpoint){
    case 'costs':
      deleteConfig.endpoint = costApi.deleteCost
      deleteConfig.name = 'despesa'
    break
    case "purchases":
      deleteConfig.endpoint = purchaseApi.deletePurchase
      deleteConfig.name = 'compra'
      break
    case 'sales':
      deleteConfig.endpoint = salesApi.deleteSales
      deleteConfig.name = 'venda'
      break
    }    

  const deleteAction = async()=>{
    try{
      const deletedResult = await deleteConfig.endpoint(activeId)
      if (deletedResult) {
        toast({
          duration: 3000,
          variant: 'default',
          description: `${deleteConfig.name} deletada com sucesso!`,
        });
      queryClient.invalidateQueries({ queryKey: [endpoint, { date, period }] })
      setIsDialogOpen(false)

      } else {
        toast({
          duration: 3000,
          variant: 'destructive',
          description: `Erro ao deletar a ${deleteConfig.name}. Tente novamente.`,
        });
        setIsDialogOpen(false)
      }

    }catch(e){
      toast({
        duration: 1000,
        variant: 'destructive',
        description: `Erro ao deletar a ${deleteConfig.name}. Tente novamente.`,
      });
      setIsDialogOpen(false)
    }    
  }  
  return {
    isDialogOpen,
    setIsDialogOpen,
    deleteAction
  }
}
  export default useDelete