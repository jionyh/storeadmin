'use-client'
import { CalendarIcon, Plus, Save } from 'lucide-react'
import {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormReturn,
} from 'react-hook-form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { PurchaseFormDataType } from '@/types/FormDataTypes'
import { Button } from '@/components/ui/button'
import { PurchasesFormFields } from './PurchasesFormFields'
import { CommonSelect } from '../commons/Select'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useCategory } from '@/utils/queries/category'
import { Calendar } from '@/components/ui/calendar'
import { Separator } from '@/components/ui/separator'
import { useProducts } from '@/utils/queries/products'
import { useUnits } from '@/utils/queries/units'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { dataUtils } from '@/utils/dataUtils'

type Props = {
  form: UseFormReturn<PurchaseFormDataType>
  append: UseFieldArrayAppend<PurchaseFormDataType>
  fields: FieldArrayWithId<PurchaseFormDataType, 'purchases', 'id'>[]
  onSubmit: (values: PurchaseFormDataType) => void
  remove: UseFieldArrayRemove
  edit: boolean
}

export const PurchasesForm = ({
  form,
  append,
  onSubmit,
  fields,
  remove,
  edit = false,
}: Props) => {
  const category = useCategory()
  const watchCategory = form.watch('category')
  const products = useProducts(watchCategory)
  const units = useUnits()

  return (
    <form
      className="w=full flex flex-col gap-2"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FormField
        control={form.control}
        name={`date`}
        render={({ field }) => (
          <FormItem className="top-0 flex-1">
            <FormLabel>Data</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    disabled={edit}
                    variant={'outline'}
                    className={cn(
                      'w-full pl-3 text-left font-normal',
                      !field.value && 'text-muted-foreground',
                    )}
                  >
                    {field.value ? (
                      dataUtils.formatFormData(field.value)
                    ) : (
                      <span>Selecione a data</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={new Date(field.value)}
                  onSelect={field.onChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />

      <Separator className="my-2" />

      {edit ? (
        <FormField
          control={form.control}
          name={`category`}
          render={({ field }) => <Input {...field} disabled />}
        />
      ) : (
        <FormField
          control={form.control}
          name={`category`}
          render={({ field }) => (
            <CommonSelect
              data={category.data.categories}
              placeholder="Selecione a categoria"
              onChange={field.onChange}
            />
          )}
        />
      )}

      <Separator className="my-2" />

      {(edit || (!edit && watchCategory && products.data && units.data)) &&
        fields.map((fields, index) => (
          <PurchasesFormFields
            key={fields.id}
            form={form}
            edit={edit}
            index={index}
            remove={remove}
          />
        ))}
      <div className="flex w-full items-center justify-end gap-1">
        {!edit && (
          <Button
            variant="blue"
            size="sm"
            disabled={!watchCategory}
            onClick={() =>
              append({
                quantity: '',
                value: '0',
                product_id: ' ',
                unit_id: ' ',
                supplier: '',
                payment: 'cartao',
              })
            }
          >
            <Plus />
            Novo Campo
          </Button>
        )}
        {!edit && (
          <Button type="submit" size="sm" disabled={edit}>
            <Save />
            {edit ? 'Editar' : 'Salvar'}
          </Button>
        )}
      </div>
    </form>
  )
}
