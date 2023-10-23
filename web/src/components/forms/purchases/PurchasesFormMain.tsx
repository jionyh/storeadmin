'use client'
import React from 'react'

import { Loader } from '@/components/Loader'
import { PageHeader } from '@/components/PageHeader'
import { Form } from '@/components/ui/form'
import { Alert } from '@/components/alertDialog/Alert'
import { PurchasesForm } from '@/components/forms/purchases/PurchasesForm'

import useFormSubmit from '@/hooks/useFormSubmit'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { PurchaseFormDataType, purchaseFormSchema } from '@/types/FormDataTypes'
import { useCategory } from '@/utils/queries/category'
import { Purchase } from '@/types/purchaseTypes'

type PurchaseFormMainProps = {
  initialData?: {
    purchase_id?: number
    quantity: string
    value: string
    product_id: string
    unit_id: string
    supplier: string
  }
}

export const PurchasesFormMain = ({ initialData }: PurchaseFormMainProps) => {
  const categories = useCategory()

  console.log(initialData)

  const { setFormData, isDialogOpen, setIsDialogOpen, submitForm } =
    useFormSubmit<PurchaseFormDataType['purchases']>({
      endpoint: 'purchases',
      name: 'compra',
    })

  const form = useForm<PurchaseFormDataType>({
    resolver: zodResolver(purchaseFormSchema),
    mode: 'onSubmit',
    defaultValues: {
      purchases: initialData?.purchase_id
        ? initialData
        : [
            {
              purchase_id: undefined,
              quantity: '',
              value: '',
              product_id: '',
              unit_id: '',
              supplier: '',
            },
          ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'purchases',
  })

  function onSubmit(values: PurchaseFormDataType) {
    setFormData(values.purchases)
    setIsDialogOpen(true)
  }

  return (
    <div>
      <h2 className="text-center text-lg font-semibold leading-none tracking-tight">
        {initialData?.purchase_id ? 'Editar Compra' : 'Adicionar Compra'}
      </h2>
      <div className="p-4">
        {categories.isLoading && <Loader visible />}
        {categories.data && (
          <div className="p-4">
            <Form {...form}>
              <PurchasesForm
                append={append}
                fields={fields}
                form={form}
                onSubmit={onSubmit}
                remove={remove}
              />
            </Form>
          </div>
        )}
        <Alert
          open={isDialogOpen}
          setOpen={setIsDialogOpen}
          submit={submitForm}
        />
      </div>
    </div>
  )
}
