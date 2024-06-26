import React from 'react'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
import { SalesFormDataType } from '@/types/FormDataTypes'
import { UseFieldArrayRemove, UseFormReturn } from 'react-hook-form'
import { PaymentResponseSuccess } from '@/types/paymentTypes'
import { formatCurrency } from '@/utils/formatCurrency'

type Props = {
  index: number
  form: UseFormReturn<SalesFormDataType>
  remove: UseFieldArrayRemove
  payments: PaymentResponseSuccess
  edit: boolean
}

export const SalesFormFields = ({
  index,
  remove,
  form,
  payments,
  edit,
}: Props) => {
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
      {edit ? (
        <FormField
          control={form.control}
          name={`sales.${index}.payment_id`}
          render={({ field }) => (
            <>
              <FormLabel>Forma de Pagamento</FormLabel>
              <Input {...field} disabled />
            </>
          )}
        />
      ) : (
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
                  {payments.paymentMethods.map((item) => (
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
      )}
      <FormField
        control={form.control}
        name={`sales.${index}.value`}
        render={({ field }) => (
          <FormItem>
            {edit && <FormLabel>Valor</FormLabel>}
            <FormControl>
              <Input
                disabled={edit}
                placeholder="valor"
                {...field}
                value={edit ? formatCurrency(field.value) : field.value}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="m-auto my-1 w-2/3 border-t-2 border-dashed"></div>
    </>
  )
}
