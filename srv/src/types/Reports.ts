export type PurchaseQuery = {
  value: number
  subcategory: {
    name: string
    cat: {
      name: string
    }
  }
}

export type SaleQuery = {
  value: number
  paymentsMethods: {
    name: string
  }
}

export type ReportReturnList = {
  category: string
  labels: string[]
  data: number[]
}
