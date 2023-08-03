import { UnitResponse } from "../../types/UnitType"
import { Capitalize } from "../capitalizeFirstLetter"

/* Função para normalizar o retorno de custos */

export const formatUnitResponse = (unit:UnitResponse[] | UnitResponse)=>{

  let unitResponse:{id:number,name:string,abbreviation: string,is_deleted: boolean}[] = []

  if(Array.isArray(unit)){
      unit.map(unit=>{
        unitResponse.push({
        id: unit.id,
        name:Capitalize(unit.name),
        abbreviation: unit.abbreviation,
        is_deleted: unit.is_deleted
      })
    }) 
  }else{
    return {
      id: unit.id,
      name:Capitalize(unit.name),
      abbreviation: unit.abbreviation,
      is_deleted: unit.is_deleted
    }
  }
  
    return unitResponse
}