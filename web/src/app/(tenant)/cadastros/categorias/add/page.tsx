'use client'
import React from 'react'

import { PageHeader } from '@/components/PageHeader'
import { Form } from '@/components/ui/form'
import { Alert } from '@/components/alertDialog/Alert'

import useFormSubmit from '@/hooks/useFormSubmit'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'

import { CategoriesFormDataType, categoriesFormSchema } from '@/types/FormDataTypes'
import { CategoriesForm } from '@/components/forms/categories/CategoriesForm'

function AddCategories(){

  const { setFormData, isDialogOpen, setIsDialogOpen, submitForm } =
    useFormSubmit<CategoriesFormDataType['categories']>({
      endpoint: 'categories',
      name: 'categoria',
    })

  const form = useForm<CategoriesFormDataType>({
    resolver: zodResolver(categoriesFormSchema),
    defaultValues: {
      categories: [{ name: ''}],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'categories',
  })

  function onSubmit(values: CategoriesFormDataType) {
    setFormData(values.categories[0])
    setIsDialogOpen(true)
  }

  return (
    <div>
      <PageHeader name="Adicionar categoria" />
        <div className="p-4">
          <Form {...form}>
            <CategoriesForm
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

export default AddCategories