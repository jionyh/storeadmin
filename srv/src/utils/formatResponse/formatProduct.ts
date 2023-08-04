import { ProductResponse } from "../../types/ProductType"
import { Capitalize } from "../capitalizeFirstLetter"

/* Função para normalizar o retorno de Produtos */

export const formatProductResponse = (product:ProductResponse[] | ProductResponse)=>{

  let productResponse:{id:number,name:string,category:{id:number,name:string}}[] = []

  if(Array.isArray(product)){
      product.map(product=>{
        productResponse.push({
        id: product.id,
        name:Capitalize(product.name),
        category: {
          id: product.category_id,
          name: product.cat.name
        }
      })
    }) 
  }else{
    return {
      id: product.id,
        name:Capitalize(product.name),
        category: {
          id: product.category_id,
          name: product.cat.name
        }
    }
  }
  
    return productResponse
}