'use-client'
import { Plus, Save } from 'lucide-react'
import { CostsFormFields } from './CostsFormFields'
import {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormReturn,
} from 'react-hook-form'
import { CostFormDataType } from '@/types/FormDataTypes'
import { Button } from '@/components/ui/button'

type Props = {
  form: UseFormReturn<CostFormDataType>
  append: UseFieldArrayAppend<CostFormDataType>
  fields: FieldArrayWithId<CostFormDataType, 'costs', 'id'>[]
  onSubmit: (values: CostFormDataType) => void
  remove: UseFieldArrayRemove
  edit:boolean
}

export const CostForm = ({ form, append, onSubmit, fields, remove, edit }: Props) => {
  return (
    <form
      className="w=full flex flex-col gap-2"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      {fields.map((fields, index) => (
        <CostsFormFields
          key={fields.id}
          form={form}
          index={index}
          remove={remove}
          edit={edit}
        />
      ))}
      <div className="flex w-full items-center justify-end gap-1">
        {!edit && <Button
          variant="blue"
          size="sm"
          onClick={() =>
            append({ name: '', value: '', date: '', recurrent: false })
          }
        >
          <Plus />
          Novo Campo
        </Button>}
        <Button type="submit" size="sm">
          <Save />
          {edit ? 'Editar' : 'Salvar'}
        </Button>
      </div>
    </form>
  )
}
