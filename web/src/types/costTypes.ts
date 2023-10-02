/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pagination } from './commonsTypes'
import { ErrorResponse } from './errorTypes'

export interface AllCostParams {
  date?: string
  period?: string
  perpage?: number
}

export interface Cost {
  id: number
  name: string
  value: number
  createAt: string
}

export interface AllCostResponse {
  success: boolean
  costs: {
    pagination: Pagination
    month_totals?: number
    day_totals?: number
    week_totals?: number
    costs: Cost[]
  }
}

export interface SingleCostResponse {
  success: boolean
  cost: Cost
}

export type CostResponse = SingleCostResponse | AllCostResponse | ErrorResponse
