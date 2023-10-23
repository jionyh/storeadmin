'use client'
import React from 'react'

import { Form } from '@/components/ui/form'
import { Alert } from '@/components/alertDialog/Alert'

import useFormSubmit from '@/hooks/useFormSubmit'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'

import { ProductsFormDataType, productsFormSchema } from '@/types/FormDataTypes'
import { ProductsForm } from '@/components/forms/products/ProductsForm'
import { Product } from '@/types/productTypes'

type ProductsFormMainProps = {
  initialData?: Product[]
}

export const ProductsFormMain = ({initialData}:ProductsFormMainProps)=>{

  const { setFormData, isDialogOpen, setIsDialogOpen, submitForm } =
  useFormSubmit<ProductsFormDataType['products']>({
    endpoint: 'products',
    name: 'produto',
  })

const form = useForm<ProductsFormDataType>({
  resolver: zodResolver(productsFormSchema),
  defaultValues: {
    products: initialData && initialData?.length > 0 ? initialData : [{ name: '', category_id: 0}],
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

console.log(fields)

  return(
    <div>
      <h2 className='text-lg font-semibold leading-none tracking-tight text-center'>
        {initialData && initialData?.length > 0 ? 'Editar Produto' : 'Adicionar Produto'}
        </h2>
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