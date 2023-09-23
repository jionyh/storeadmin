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

export default function AddPurchases() {
  const categories = useCategory()

  const { setFormData, isDialogOpen, setIsDialogOpen, submitForm } =
    useFormSubmit<PurchaseFormDataType['purchases']>({ endpoint: 'purchases', name: 'compra' })



  const form = useForm<PurchaseFormDataType>({
    resolver: zodResolver(purchaseFormSchema),
    mode: 'onSubmit',
    defaultValues: {
      purchases: [
        {
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
      <PageHeader name="Adicionar compras" />
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
  )
}
