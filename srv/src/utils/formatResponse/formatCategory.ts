import dayjs from "dayjs"
import { CategoryResponse } from "../../types/CategoryType"
import { Capitalize } from "../capitalizeFirstLetter"

/* Função para normalizar o retorno de custos */

export const formatCategoryResponse = (category:CategoryResponse[] | CategoryResponse)=>{

  let categoryResponse:{id:number,name:string}[] = []

  if(Array.isArray(category)){
      category.map(cat=>{
        categoryResponse.push({
        id: cat.id,
        name:Capitalize(cat.name),
      })
    }) 
  }else{
    return {
      id: category.id,
      name:Capitalize(category.name),
    }
  }
  
    return categoryResponse
}