/* eslint-disable no-use-before-define */
export interface PurchaseList {
  success: boolean
  data: D[]
  total: number
}

export interface D {
  id: number
  name: string
  produto: Purchase[]
}

export interface Purchase {
  id: number
  catId: number
  name: string
  quantity: string
  unit: string
  value: string
  supplier?: string
}