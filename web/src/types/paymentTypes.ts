export interface PaymentResponseSuccess {
  success: true
  paymentMethods: {
    id: number
    name: string
  }[]
}
