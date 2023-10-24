'use client'
import React from 'react'

import { Loader } from '@/components/Loader'
import { Form } from '@/components/ui/form'
import { Alert } from '@/components/alertDialog/Alert'
import { SalesForm } from '@/components/forms/sales/SalesForm'

import useFormSubmit from '@/hooks/useFormSubmit'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { usePayments } from '@/utils/queries/payments'

import { SalesFormDataType, salesFormSchema } from '@/types/FormDataTypes'

type SalesFormMainProps = {
  initialData: {
    sale_id?: number
    value: string
    payment_id: string
  }[]
  onSuccess?: (status: boolean) => void
}

const emptyFields = [{ payment_id: '', value: '' }]

export const SalesFormMain = ({
  initialData,
  onSuccess,
}: SalesFormMainProps) => {
  const paymentsMethods = usePayments()

  const itsEditForm = initialData?.some((el) => el.sale_id !== undefined)

  const { setFormData, isDialogOpen, setIsDialogOpen, submitForm } =
    useFormSubmit<SalesFormDataType['sales']>({
      endpoint: 'sales',
      name: 'venda',
      onSuccess,
    })

  const form = useForm<SalesFormDataType>({
    resolver: zodResolver(salesFormSchema),
    defaultValues: {
      sales: itsEditForm ? initialData : emptyFields,
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
      <h2 className="text-center text-lg font-semibold leading-none tracking-tight">
        {itsEditForm ? 'Editar Compra' : 'Adicionar Compra'}
      </h2>
      <div className="p-4">
        {paymentsMethods.isLoading && <Loader visible />}
        {paymentsMethods.data && (
          <div className="p-4">
            <Form {...form}>
              <SalesForm
                append={append}
                fields={fields}
                form={form}
                onSubmit={onSubmit}
                edit={itsEditForm}
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
    </div>
  )
}
