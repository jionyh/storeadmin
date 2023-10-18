import React from 'react'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { CategoriesFormDataType, ProductsFormDataType } from '@/types/FormDataTypes'
import { UseFieldArrayRemove, UseFormReturn } from 'react-hook-form'
import { CommonSelect } from '../commons/Select'
import { useCategory } from '@/utils/queries/category'

type Props = {
  index: number
  form: UseFormReturn<ProductsFormDataType>
  remove: UseFieldArrayRemove
}

export const ProductsFormFields = ({ index, remove, form }: Props) => {

  const categories = useCategory()

  return (
    <>
      {index === 0 ? (
        ''
      ) : (
        <span className="flex justify-end">
          <X
            onClick={() => remove(index)}
            className="h-4 w-4 cursor-pointer text-destructive"
          />
        </span>
      )}
      {categories.data &&  <FormField
        control={form.control}
        name={`products.${index}.category_id`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
            <CommonSelect data={categories.data.categories} onChange={field.onChange} placeholder='Selecione a categoria'/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />}
      <FormField
        control={form.control}
        name={`products.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder="Produto" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="m-auto my-1 w-2/3 border-t-2 border-dashed"></div>
    </>
  )
}
