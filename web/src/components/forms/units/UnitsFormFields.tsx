import React from 'react'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { UnitsFormDataType } from '@/types/FormDataTypes'
import { UseFieldArrayRemove, UseFormReturn } from 'react-hook-form'

type Props = {
  index: number
  form: UseFormReturn<UnitsFormDataType>
  remove: UseFieldArrayRemove
}

export const UnitsFormFields = ({ index, remove, form }: Props) => {
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
      <FormField
        control={form.control}
        name={`units.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder="Unidade" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`units.${index}.abbreviation`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder="Abreviação" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="m-auto my-1 w-2/3 border-t-2 border-dashed"></div>
    </>
  )
}
