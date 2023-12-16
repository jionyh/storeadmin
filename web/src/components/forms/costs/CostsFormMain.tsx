'use client'
import React from 'react'

import { Loader } from '@/components/Loader'
import { Form } from '@/components/ui/form'
import { Alert } from '@/components/alertDialog/Alert'

import useFormSubmit from '@/hooks/useFormSubmit'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { CostFormDataType, costFormSchema } from '@/types/FormDataTypes'
import { CostForm } from '@/components/forms/costs/CostsForm'
import { usePayments } from '@/utils/queries/payments'

type SalesFormMainProps = {
  initialData: {
    cost_id?: number
    name: string
    value: string
    date: string
  }[]
  onSuccess?: (status: boolean) => void
}

const emptyFields = [
  {
    name: '',
    value: '',
    date: '',
    recurrent: false,
  },
]

export const CostsFormMain = ({
  initialData,
  onSuccess,
}: SalesFormMainProps) => {
  const paymentsMethods = usePayments()
  
  const itsEditForm = initialData?.some((el) => el.cost_id !== undefined)

  const { setFormData, isDialogOpen, setIsDialogOpen, submitForm } =
    useFormSubmit<CostFormDataType['costs']>({
      endpoint: 'costs',
      name: 'despesa',
      onSuccess,
      edit: itsEditForm
    })

  const form = useForm<CostFormDataType>({
    resolver: zodResolver(costFormSchema),
    mode: 'onSubmit',
    defaultValues: {
      costs: itsEditForm ? initialData : emptyFields,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'costs',
  })

  function onSubmit(values: CostFormDataType) {
    setFormData(values.costs)
    setIsDialogOpen(true)
  }

  return (
    <div>
      <h2 className="text-center text-lg font-semibold leading-none tracking-tight">
        {itsEditForm ? 'Editar Despesa' : 'Adicionar Despesa'}
      </h2>
      <div className="p-4">
        {paymentsMethods.isLoading && <Loader visible />}
        {paymentsMethods.data && (
          <div className="p-4">
            <Form {...form}>
              <CostForm
                append={append}
                fields={fields}
                form={form}
                edit={itsEditForm}
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
