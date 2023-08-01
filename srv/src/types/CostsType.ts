export type CostType = {
  name: string
  value: number
  tenant_id: number
}

export type CostResponse = {
  id: number
  name: string
  value: number
  createAt: Date
  tenant_id: number
}

type Pagination = {
  totalRecords: number
  totalPages: number
  currentPage: number
  recordsPerPage: number
}

export type CostDay = {
  date: string
  total: string
  dailyCosts:{
    id: number
    value: string
    payment_id: number
  }[]
}

export type CostReturn = {
  pagination: Pagination
  date: CostDay[]

}