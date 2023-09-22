'use client'
import { Loader } from '@/components/Loader'
import { PageHeader } from '@/components/PageHeader'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { usePayments } from '@/utils/queries/payments'
import { X, Plus, Save } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { api } from '@/lib/axios'
import React, { useState } from 'react'
import { SalesFormDataType, salesFormSchema } from '@/types/FormDataTypes'
import { Alert } from '@/components/alertDialog/Alert'
import { useToast } from '@/components/ui/use-toast'

export default function AddSales() {
  const paymentsMethods = usePayments()
  const { toast } = useToast()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState<SalesFormDataType>()

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

  async function onSubmit(values: SalesFormDataType) {
    setFormData(values)
    setIsDialogOpen(true)
  }

  async function submitForm() {
    setIsDialogOpen(false)
    if (formData) {
      const response = await api.post('/sales', formData.sales)
      if (response.data.success) {
        toast({
          description: 'Venda adiciona com sucesso!',
        })
      } else {
        toast({
          variant: 'destructive',
          description: 'Problema ao criar a venda! Tente novamente.',
        })
      }
    }
  }

  return (
    <div>
      <PageHeader name="Adicionar vendas" />
      {paymentsMethods.isLoading && <Loader visible />}
      {paymentsMethods.data && (
        <div className="p-4">
          <Form {...form}>
            <form
              className="w=full flex flex-col gap-2"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              {fields.map((fields, index) => (
                <React.Fragment key={fields.id}>
                  {index === 0 ? (
                    ''
                  ) : (
                    <span
                      onClick={() => remove(index)}
                      className="flex justify-end"
                    >
                      <X className="h-4 w-4 cursor-pointer text-destructive" />
                    </span>
                  )}
                  <FormField
                    control={form.control}
                    name={`sales.${index}.payment_id`}
                    render={({ field }) => (
                      <FormItem>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Forma de Recebimento" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {paymentsMethods.data.paymentMethods.map((item) => (
                              <SelectItem
                                key={item.id}
                                value={item.id.toString()}
                              >
                                {item.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                          <FormMessage />
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`sales.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="valor" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="m-auto my-1 w-2/3 border-t-2 border-dashed"></div>
                </React.Fragment>
              ))}
              <div className="flex w-full items-center justify-end gap-1">
                <Button
                  variant="blue"
                  size="sm"
                  onClick={() => append({ payment_id: '', value: '' })}
                >
                  <Plus />
                  Novo Campo
                </Button>
                <Button type="submit" size="sm">
                  <Save />
                  Salvar
                </Button>
              </div>
            </form>
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
