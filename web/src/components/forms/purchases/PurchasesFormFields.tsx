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

type Props = {
  index: number
  form: UseFormReturn<PurchaseFormDataType>
  remove: UseFieldArrayRemove
}

export const PurchasesFormFields = ({ index, remove, form }: Props) => {
  const { data } = useCategory()
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
        name={`purchases.${index}.category`}
        render={({ field }) => (
          <FormItem>
            <Select
              defaultValue={data.categories[0].id.toString()}
              onValueChange={field.onChange}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {data.categories.map((item) => (
                  <SelectItem key={item.id} value={item.id.toString()}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
              <FormMessage />
            </Select>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`purchases.${index}.value`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder="valor" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="m-auto my-1 w-2/3 border-t-2 border-dashed"></div>
    </>
  )
}
