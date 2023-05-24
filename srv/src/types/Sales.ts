export type SalesReturn = {
  day: string
  total: string
  data: [
    {
      id: number
      value: string
      payment: string
    },
  ]
}
