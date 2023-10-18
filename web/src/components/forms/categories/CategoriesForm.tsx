'use-client'
import { Plus, Save } from 'lucide-react'
import {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormReturn,
} from 'react-hook-form'
import { CategoriesFormDataType, UnitsFormDataType } from '@/types/FormDataTypes'
import { Button } from '@/components/ui/button'
import { CategoriesFormFields } from './CategoriesFormFields'

type Props = {
  form: UseFormReturn<CategoriesFormDataType>
  append: UseFieldArrayAppend<CategoriesFormDataType>
  fields: FieldArrayWithId<CategoriesFormDataType, 'categories', 'id'>[]
  onSubmit: (values: CategoriesFormDataType) => void
  remove: UseFieldArrayRemove
}

export const CategoriesForm = ({
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
        <CategoriesFormFields
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
          disabled
          onClick={() => append({ name: ''})}
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
