import dayjs from "dayjs"
import { CategoryResponse } from "../../types/CategoryType"
import { Capitalize } from "../capitalizeFirstLetter"

/* Função para normalizar o retorno de custos */

export const formatCategoryResponse = (category:CategoryResponse[] | CategoryResponse)=>{

  let categoryResponse:{id:number,name:string,is_deleted: boolean}[] = []

  if(Array.isArray(category)){
      category.map(cat=>{
        categoryResponse.push({
        id: cat.id,
        name:Capitalize(cat.name),
        is_deleted: cat.is_deleted
      })
    }) 
  }else{
    return {
      id: category.id,
      name:Capitalize(category.name),
      is_deleted: category.is_deleted
    }
  }
  
    return categoryResponse
}