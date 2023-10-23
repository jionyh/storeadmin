'use client'
import { Form } from '@/components/ui/form'
import { Alert } from '@/components/alertDialog/Alert'

import useFormSubmit from '@/hooks/useFormSubmit'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'

import { UnitsFormDataType, unitsFormSchema } from '@/types/FormDataTypes'
import { UnitsForm } from '@/components/forms/units/UnitsForm'

type UnitsFormMainProps = {
  initialData?: UnitsFormDataType['units']
}

export const UnitsFormMain = ({initialData}:UnitsFormMainProps)=>{

  const { setFormData, isDialogOpen, setIsDialogOpen, submitForm } =
  useFormSubmit<UnitsFormDataType['units']>({
    endpoint: 'units',
    name: 'unidades',
  })

const form = useForm<UnitsFormDataType>({
  resolver: zodResolver(unitsFormSchema),
  defaultValues: {
    units: initialData && initialData?.length > 0 ? initialData : [{ name: '', abbreviation: '' }],
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

  return(
    <div>
      <h2 className='text-lg font-semibold leading-none tracking-tight text-center'>
        {initialData && initialData?.length > 0 ? 'Editar Unidade' : 'Adicionar Unidade'}
        </h2>
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