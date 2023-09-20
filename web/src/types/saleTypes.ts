import { Pagination } from './commonsTypes'
import { ErrorResponse } from './errorTypes'

export interface AllSalesParams {
  date?: string,
  period?: string,
  perpage?: number
}

export interface Sale {
  id: number
  value: number
  payment_id: number
}

export interface AllSalesResponse {
  success: boolean
  sales: {
    pagination: Pagination
    month_totals?: number
    day_totals?: number
    week_totals?: number
    allSales: {
      date: string
      total: string
      dailySales: Sale[]
    }[]
  }
}

export interface SingleSaleResponse {
  success: boolean
  sale: Sale & { createAt: string }
}

export type SaleResponse = SingleSaleResponse | AllSalesResponse | ErrorResponse
