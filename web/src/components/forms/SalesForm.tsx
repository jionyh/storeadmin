'use client'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../ui/select'
import { X, Plus, Save } from 'lucide-react'
import React from 'react'
import {
  Form,
  UseFieldArrayReturn,
  UseFormReturn,
  useFieldArray,
  useForm,
} from 'react-hook-form'
import { FormField, FormItem, FormControl, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { PaymentResponseSuccess } from '@/types/paymentTypes'
import { SalesFormDataType, salesFormSchema } from '@/types/FormDataTypes'
import { Button } from '../ui/button'

interface Props {
  form: UseFormReturn<SalesFormDataType>
  formFields: UseFieldArrayReturn<SalesFormDataType>
  data: PaymentResponseSuccess
  onSubmit: (values: SalesFormDataType) => void
}

export const SalesForm = ({ form, formFields, data, onSubmit }: Props) => {
  return (
    <form
      className="w=full flex flex-col gap-2"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      {formFields.fields.map((fields, index) => (
        <React.Fragment key={fields.id}>
          {index === 0 ? (
            ''
          ) : (
            <span
              onClick={() => formFields.remove(index)}
              className="flex justify-end"
            >
              <X className="h-4 w-4 cursor-pointer text-destructive" />
            </span>
          )}
          <FormField
            control={form.control}
            name={`sales.${index}.payment_id`}
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Forma de Recebimento" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {data.paymentMethods.map((item) => (
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
            name={`sales.${index}.value`}
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
        </React.Fragment>
      ))}
      <div className="flex w-full items-center justify-end gap-1">
        <Button
          variant="blue"
          size="sm"
          onClick={() => formFields.append({ payment_id: '', value: '' })}
        >
          <Plus />
          Novo Campo
        </Button>
        <Button type="submit" size="sm">
          <Save />
          Salvar
        </Button>
      </div>
    </form>
  )
}
