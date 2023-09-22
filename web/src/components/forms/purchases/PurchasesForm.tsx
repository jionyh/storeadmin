'use-client'
import { Plus, Save } from 'lucide-react'
import {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormReturn,
} from 'react-hook-form'
import { PurchaseFormDataType } from '@/types/FormDataTypes'
import { Button } from '@/components/ui/button'
import { PurchasesFormFields } from './PurchasesFormFields'

type Props = {
  form: UseFormReturn<PurchaseFormDataType>
  append: UseFieldArrayAppend<PurchaseFormDataType>
  fields: FieldArrayWithId<PurchaseFormDataType, 'purchases', 'id'>[]
  onSubmit: (values: PurchaseFormDataType) => void
  remove: UseFieldArrayRemove
}

export const PurchasesForm = ({
  form,
  append,
  onSubmit,
  fields,
  remove,
}: Props) => {
  return (
    <form
      className="w=full flex flex-col gap-2"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      {fields.map((fields, index) => (
        <PurchasesFormFields
          key={fields.id}
          form={form}
          index={index}
          remove={remove}
        />
      ))}
      <div className="flex w-full items-center justify-end gap-1">
        <Button
          variant="blue"
          size="sm"
          onClick={() =>
            append({
              category: '',
              quantity: '',
              value: '',
              product_id: '',
              unit_id: '',
              supplier: '',
            })
          }
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
