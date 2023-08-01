import dayjs from "dayjs"
import { CostResponse } from "../types/CostsType"

/* Função para normalizar o retorno de custos */

export const formatCostResponse = (costs:CostResponse[] | CostResponse)=>{

  let costsResponse:{id:number,name:string,value:number,createAt:String}[] = []

  if(Array.isArray(costs)){
    costs.map(cost=>{
      costsResponse.push({
        id: cost.id,
        name:cost.name,
        value: cost.value,
        createAt: dayjs(cost.createAt).format('YYYY-MM-DD')
      })
    })
  }else{
    return {
      id: costs.id,
      name:costs.name,
      value: costs.value,
      createAt: dayjs(costs.createAt).format('YYYY-MM-DD')
    }
  }
  
  
    return costsResponse
}