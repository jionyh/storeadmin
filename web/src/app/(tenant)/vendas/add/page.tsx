'use client'
import React from 'react'

import { Loader } from '@/components/Loader'
import { PageHeader } from '@/components/PageHeader'
import { Form } from '@/components/ui/form'
import { Alert } from '@/components/alertDialog/Alert'
import { SalesForm } from '@/components/forms/sales/SalesForm'

import useFormSubmit from '@/hooks/useFormSubmit'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { usePayments } from '@/utils/queries/payments'

import { SalesFormDataType, salesFormSchema } from '@/types/FormDataTypes'

export default function AddSales() {
  const paymentsMethods = usePayments()

  const { setFormData, isDialogOpen, setIsDialogOpen, submitForm } =
    useFormSubmit<SalesFormDataType['sales']>({ endpoint: 'sales', name: 'venda' })

  const form = useForm<SalesFormDataType>({
    resolver: zodResolver(salesFormSchema),
    defaultValues: {
      sales: [{ payment_id: '', value: '' }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'sales',
  })

  function onSubmit(values: SalesFormDataType) {
    setFormData(values.sales)
    setIsDialogOpen(true)
  }

  return (
    <div>
      <PageHeader name="Adicionar vendas" />
      {paymentsMethods.isLoading && <Loader visible />}
      {paymentsMethods.data && (
        <div className="p-4">
          <Form {...form}>
            <SalesForm
              append={append}
              fields={fields}
              form={form}
              onSubmit={onSubmit}
              paymentsMethods={paymentsMethods.data}
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
