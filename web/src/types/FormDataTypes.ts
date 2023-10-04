import * as z from 'zod'

export const salesFormSchema = z.object({
  sales: z.array(
    z.object({
      payment_id: z.string().nonempty('Campo obrigatório'),
      value: z.string().nonempty('Campo obrigatório'),
    }),
  ),
})

export type SalesFormDataType = z.infer<typeof salesFormSchema>

// PurchaseForm //

export const purchaseFormSchema = z.object({
  category: z.string().nonempty('Campo obrigatório'),
  purchases: z.array(
    z.object({
      product_id: z.string().nonempty('Campo obrigatório'),
      unit_id: z.string().nonempty('Campo obrigatório'),
      quantity: z.string().nonempty('Campo obrigatório'),
      value: z.string().nonempty('Campo obrigatório'),
      supplier: z.string().optional(),
    }),
  ),
})

export type PurchaseFormDataType = z.infer<typeof purchaseFormSchema>

// CostForm //

export const costFormSchema = z.object({
  costs: z.array(
    z.object({
      name: z.string().nonempty('Campo obrigatório'),
      value: z.string().nonempty('Campo obrigatório'),
      date: z.string().nonempty('Campo obrigatório'),
      recurrent: z.boolean({ required_error: 'Campo obrigatório' }),
    }),
  ),
})

export type CostFormDataType = z.infer<typeof costFormSchema>
