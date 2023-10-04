'use client'
import React from 'react'

import { Loader } from '@/components/Loader'
import { PageHeader } from '@/components/PageHeader'
import { Form } from '@/components/ui/form'
import { Alert } from '@/components/alertDialog/Alert'

import useFormSubmit from '@/hooks/useFormSubmit'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { CostFormDataType, costFormSchema } from '@/types/FormDataTypes'
import { useCategory } from '@/utils/queries/category'
import { CostForm } from '@/components/forms/costs/CostsForm'

export default function AddCosts() {
  const categories = useCategory()

  const { setFormData, isDialogOpen, setIsDialogOpen, submitForm } =
    useFormSubmit<CostFormDataType['costs']>({
      endpoint: 'purchases',
      name: 'compra',
    })

  const form = useForm<CostFormDataType>({
    resolver: zodResolver(costFormSchema),
    mode: 'onSubmit',
    defaultValues: {
      costs: [
        {
          name: '',
          value: '',
          date: '',
          recurrent: false,
        },
      ],
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
      <PageHeader name="Adicionar despesas" />
      {categories.isLoading && <Loader visible />}
      <div className="p-4">
        <Form {...form}>
          <CostForm
            append={append}
            fields={fields}
            form={form}
            onSubmit={onSubmit}
            remove={remove}
          />
        </Form>
      </div>
      <Alert
        open={isDialogOpen}
        setOpen={setIsDialogOpen}
        submit={submitForm}
      />
    </div>
  )
}
