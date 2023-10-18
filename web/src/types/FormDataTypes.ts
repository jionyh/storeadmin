import dayjs from 'dayjs'
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
      date: z.date().or(z.string({ required_error: 'Campo obrigatório' }).nonempty('Campo obrigatório')).transform(date => dayjs(date).format("YYYY-MM-DD")),
      recurrent: z.boolean({ required_error: 'Campo obrigatório' }),
    }),
  ),
})

export type CostFormDataType = z.infer<typeof costFormSchema>

// UnitForm //

export const unitsFormSchema = z.object({
  units: z.array(
    z.object({
      name: z.string().nonempty('Campo obrigatório'),
      abbreviation: z.string().nonempty('Campo obrigatório'),
    }),
  ),
})

export type UnitsFormDataType = z.infer<typeof unitsFormSchema>

// CategoriesForm //

export const categoriesFormSchema = z.object({
  categories: z.array(
    z.object({
      name: z.string().nonempty('Campo obrigatório')
    }),
  ),
})

export type CategoriesFormDataType = z.infer<typeof categoriesFormSchema>

// ProductsForm //

export const productsFormSchema = z.object({
  products: z.array(
    z.object({
      name: z.string().nonempty('Campo obrigatório'),
      category_id: z.coerce.string().nonempty('Campo obrigatório').transform(id=>parseInt(id))
    }),
  ),
})

export type ProductsFormDataType = z.infer<typeof productsFormSchema>