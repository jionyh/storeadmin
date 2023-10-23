'use client'

import { Form } from '@/components/ui/form'
import { Alert } from '@/components/alertDialog/Alert'

import useFormSubmit from '@/hooks/useFormSubmit'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'

import { CategoriesFormDataType, categoriesFormSchema } from '@/types/FormDataTypes'
import { CategoriesForm } from '@/components/forms/categories/CategoriesForm'

type CategoriesFormMainProps = {
  initialData?: CategoriesFormDataType['categories']
}

export const CategoriesFormMain = ({initialData}:CategoriesFormMainProps)=>{
  const { setFormData, isDialogOpen, setIsDialogOpen, submitForm } =
    useFormSubmit<CategoriesFormDataType['categories']>({
      endpoint: 'categories',
      name: 'categoria',
    })

  const form = useForm<CategoriesFormDataType>({
    resolver: zodResolver(categoriesFormSchema),
    defaultValues: {
      categories: initialData && initialData?.length > 0 ? initialData : [{ name: ''}],
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

  return(
    <div>
      <h2 className='text-lg font-semibold leading-none tracking-tight text-center'>
        {initialData && initialData?.length > 0 ? 'Editar Categoria' : 'Adicionar nova categoria'}
        </h2>
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