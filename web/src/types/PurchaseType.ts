/* eslint-disable no-use-before-define */
export interface PurchaseList {
  sucess: boolean
  data: D[]
  total: number
}

export interface D {
  id: number
  name: string
  produto: Pr[]
}

export interface Pr {
  category: number
  id: number
  catId: number
  name: string
  quantity: number
  unit: string
  valor: number
}
