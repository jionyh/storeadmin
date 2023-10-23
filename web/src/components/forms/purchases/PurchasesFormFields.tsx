'use client'
import React from 'react'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { UseFieldArrayRemove, UseFormReturn } from 'react-hook-form'
import { PurchaseFormDataType } from '@/types/FormDataTypes'
import { useCategory } from '@/utils/queries/category'
import { CommonSelect } from '../commons/Select'
import { useProducts } from '@/utils/queries/products'
import { useUnits } from '@/utils/queries/units'

type Props = {
  index: number
  form: UseFormReturn<PurchaseFormDataType>
  remove: UseFieldArrayRemove
}

export const PurchasesFormFields = ({ index, remove, form }: Props) => {
  const formWatch = form.watch()
  const { data: ProductsData } = useProducts(formWatch.category)
  const { data: UnitsData } = useUnits()

  const getUnitAbbreviation = (id: string) =>
    UnitsData.units.find((unit) => unit.id.toString() === id)?.abbreviation ||
    ''
  console.log(formWatch)
  return (
    <>
      {index === 0 ? (
        ''
      ) : (
        <span onClick={() => remove(index)} className="flex justify-end">
          <X className="h-4 w-4 cursor-pointer text-destructive" />
        </span>
      )}
      <FormField
        control={form.control}
        name={`purchases.${index}.product_id`}
        render={({ field }) => (
          <CommonSelect
            data={ProductsData.products.products}
            onChange={field.onChange}
            placeholder="Selecione o produto"
          />
        )}
      />
      <FormField
        control={form.control}
        name={`purchases.${index}.unit_id`}
        render={({ field }) => (
          <CommonSelect
            data={UnitsData.units}
            onChange={field.onChange}
            placeholder="Selecione o tipo de unidade"
          />
        )}
      />
      <div className="flex items-start gap-1">
        <FormField
          control={form.control}
          name={`purchases.${index}.quantity`}
          render={({ field }) => (
            <FormItem className="top-0 flex-1">
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Quantidade"
                    className="text-sm"
                    {...field}
                  />
                  <span className="absolute right-1 top-1/2 -translate-y-1/2 transform text-xs text-muted-foreground">
                    {getUnitAbbreviation(formWatch.purchases[index].unit_id)}
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`purchases.${index}.value`}
          render={({ field }) => (
            <FormItem className="top-0 flex-1">
              <FormControl>
                <Input className="" placeholder="Valor" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name={`purchases.${index}.supplier`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder="Fornecedor" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="m-auto my-1 w-2/3 border-t-2 border-dashed"></div>
    </>
  )
}
