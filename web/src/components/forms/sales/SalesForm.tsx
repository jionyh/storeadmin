'use-client'
import { Plus, Save, CalendarIcon } from 'lucide-react'
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'
import { dataUtils } from '@/utils/dataUtils'

type Props = {
  form: UseFormReturn<SalesFormDataType>
  append: UseFieldArrayAppend<SalesFormDataType>
  fields: FieldArrayWithId<SalesFormDataType, 'sales', 'id'>[]
  onSubmit: (values: SalesFormDataType) => void
  remove: UseFieldArrayRemove
  paymentsMethods: PaymentResponseSuccess
  edit: boolean
}

export const SalesForm = ({
  form,
  append,
  onSubmit,
  fields,
  remove,
  edit,
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
          edit={edit}
          index={index}
          payments={paymentsMethods}
          remove={remove}
        />
      ))}
      <div className="flex w-full items-center justify-end gap-1">
        {!edit && (
          <Button
            variant="blue"
            size="sm"
            onClick={() => append({ payment_id: '', value: '' })}
          >
            <Plus />
            Novo Campo
          </Button>
        )}
        {!edit && (
          <Button disabled={edit} type="submit" size="sm">
            <Save />
            {edit ? 'Editar' : 'Salvar'}
          </Button>
        )}
      </div>
    </form>
  )
}
