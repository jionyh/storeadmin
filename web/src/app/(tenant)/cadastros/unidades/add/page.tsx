'use client'
import React from 'react'

import { PageHeader } from '@/components/PageHeader'
import { Form } from '@/components/ui/form'
import { Alert } from '@/components/alertDialog/Alert'

import useFormSubmit from '@/hooks/useFormSubmit'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'

import { UnitsFormDataType, unitsFormSchema } from '@/types/FormDataTypes'
import { UnitsForm } from '@/components/forms/units/UnitsForm'

function AddUnits(){

  const { setFormData, isDialogOpen, setIsDialogOpen, submitForm } =
    useFormSubmit<UnitsFormDataType['units']>({
      endpoint: 'units',
      name: 'unidades',
    })

  const form = useForm<UnitsFormDataType>({
    resolver: zodResolver(unitsFormSchema),
    defaultValues: {
      units: [{ name: '', abbreviation: '' }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'units',
  })

  function onSubmit(values: UnitsFormDataType) {
    setFormData(values.units[0])
    setIsDialogOpen(true)
  }

  return (
    <div>
      <PageHeader name="Adicionar unidade" />
        <div className="p-4">
          <Form {...form}>
            <UnitsForm
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

export default AddUnits