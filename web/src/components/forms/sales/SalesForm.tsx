'use-client'
import { Plus, Save } from 'lucide-react'
import { SalesFormFields } from './SalesFormFields'
import {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormReturn,
} from 'react-hook-form'
import { SalesFormDataType } from '@/types/FormDataTypes'
import { PaymentResponseSuccess } from '@/types/paymentTypes'
import { Button } from '@/components/ui/button'

type Props = {
  form: UseFormReturn<SalesFormDataType>
  append: UseFieldArrayAppend<SalesFormDataType>
  fields: FieldArrayWithId<SalesFormDataType, 'sales', 'id'>[]
  onSubmit: (values: SalesFormDataType) => void
  remove: UseFieldArrayRemove
  paymentsMethods: PaymentResponseSuccess
}

export const SalesForm = ({
  form,
  append,
  onSubmit,
  fields,
  remove,
  paymentsMethods,
}: Props) => {
  return (
    <form
      className="w=full flex flex-col gap-2"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      {fields.map((fields, index) => (
        <SalesFormFields
          key={fields.id}
          form={form}
          index={index}
          payments={paymentsMethods}
          remove={remove}
        />
      ))}
      <div className="flex w-full items-center justify-end gap-1">
        <Button
          variant="blue"
          size="sm"
          onClick={() => append({ payment_id: '', value: '' })}
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
