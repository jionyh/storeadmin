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
import { CommonSelect } from '../commons/Select'
import { FormField } from '@/components/ui/form'
import { useCategory } from '@/utils/queries/category'
import { Separator } from '@/components/ui/separator'
import { useProducts } from '@/utils/queries/products'
import { useUnits } from '@/utils/queries/units'

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
  const category = useCategory()
  const watchCategory = form.watch('category')
  const products = useProducts(watchCategory)
  const units = useUnits()

  console.log('form', fields)

  return (
    <form
      className="w=full flex flex-col gap-2"
      onSubmit={form.handleSubmit(onSubmit)}
    >
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

      <Separator className="my-2" />

      {watchCategory &&
        products.data &&
        units.data &&
        fields.map((fields, index) => (
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
          disabled={!watchCategory}
          onClick={() =>
            append({
              quantity: '',
              value: '0',
              product_id: ' ',
              unit_id: ' ',
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
