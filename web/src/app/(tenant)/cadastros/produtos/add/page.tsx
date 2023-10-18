'use client'
import React from 'react'

import { PageHeader } from '@/components/PageHeader'
import { Form } from '@/components/ui/form'
import { Alert } from '@/components/alertDialog/Alert'

import useFormSubmit from '@/hooks/useFormSubmit'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'

import { ProductsFormDataType, productsFormSchema } from '@/types/FormDataTypes'
import { ProductsForm } from '@/components/forms/products/ProductsForm'

function AddProducts(){

  const { setFormData, isDialogOpen, setIsDialogOpen, submitForm } =
    useFormSubmit<ProductsFormDataType['products']>({
      endpoint: 'products',
      name: 'categoria',
    })

  const form = useForm<ProductsFormDataType>({
    resolver: zodResolver(productsFormSchema),
    defaultValues: {
      products: [{ name: '', category_id: 0}],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'products',
  })

  function onSubmit(values: ProductsFormDataType) {
    setFormData(values.products)
    setIsDialogOpen(true)
  }

  return (
    <div>
      <PageHeader name="Adicionar produtos" />
        <div className="p-4">
          <Form {...form}>
            <ProductsForm
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

export default AddProducts