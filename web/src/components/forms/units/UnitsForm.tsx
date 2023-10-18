'use-client'
import { Plus, Save } from 'lucide-react'
import {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormReturn,
} from 'react-hook-form'
import { UnitsFormDataType } from '@/types/FormDataTypes'
import { Button } from '@/components/ui/button'
import { UnitsFormFields } from './UnitsFormFields'

type Props = {
  form: UseFormReturn<UnitsFormDataType>
  append: UseFieldArrayAppend<UnitsFormDataType>
  fields: FieldArrayWithId<UnitsFormDataType, 'units', 'id'>[]
  onSubmit: (values: UnitsFormDataType) => void
  remove: UseFieldArrayRemove
}

export const UnitsForm = ({
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
        <UnitsFormFields
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
          onClick={() => append({ name: '', abbreviation: '' })}
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
