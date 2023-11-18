/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pagination } from './commonsTypes'
import { ErrorResponse } from './errorTypes'

export interface AllPurchasesParams {
  date?: string
  period?: string
  perpage?: number
}

export interface Purchase {
  id: number
  quantity: number
  value: string
  createAt: string
  product: string
  unit: string
  supplier: string
  payment: string
}
export interface Purchases {
  pagination: Pagination
  'month_totals'?: number
  'day_totals'?: number
  'week_totals'?: number
  allPurchases: {
    date: string
    total: string
    dailyPurchases: {
      category: string
      purchases: Purchase[]
    }[]
  }[]
}

export interface AllPurchaseResponse {
  success: boolean
  purchases: Purchases
}

export interface SinglePurchaseResponse {
  success: boolean
  purchase: Purchase
}

export type PurchaseResponse =
  | SinglePurchaseResponse
  | AllPurchaseResponse
  | ErrorResponse
