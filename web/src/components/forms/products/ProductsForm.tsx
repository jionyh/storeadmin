'use-client'
import { Plus, Save } from 'lucide-react'
import {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormReturn,
} from 'react-hook-form'
import { ProductsFormDataType } from '@/types/FormDataTypes'
import { Button } from '@/components/ui/button'
import { ProductsFormFields } from './ProductsFormFields'
import { undefined } from 'zod'

type Props = {
  form: UseFormReturn<ProductsFormDataType>
  append: UseFieldArrayAppend<ProductsFormDataType>
  fields: FieldArrayWithId<ProductsFormDataType, 'products', 'id'>[]
  onSubmit: (values: ProductsFormDataType) => void
  remove: UseFieldArrayRemove
}

export const ProductsForm = ({
  form,
  append,
  onSubmit,
  fields,
  remove,
}: Props) => {
  const isEditForm = fields.findIndex((field) => field.prod_id) !== -1
  return (
    <form
      className="w=full flex flex-col gap-2"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      {fields.map((fields, index) => (
        <ProductsFormFields
          key={fields.id}
          form={form}
          index={index}
          remove={remove}
        />
      ))}
      <div className="flex w-full items-center justify-end gap-1">
        <Button
          variant="blue"
          disabled={isEditForm}
          size="sm"
          onClick={() => append({ name: '', category_id: 0 })}
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
