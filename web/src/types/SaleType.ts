export type SalesList = {
  success: boolean
  total: number
  data: {
    day: string
    data: {
      id: string
      value: string
      payment: string
    }[]
  }[]
}

export type SaleInfoModal = {
  id: number
  value: string
  payment: string
}

export type Payments = {
  id: number
  name: string
}

export type SaleListPost = {
  value: string
  paymentId: string
}
