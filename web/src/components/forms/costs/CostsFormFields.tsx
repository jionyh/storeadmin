'use client'
import React from 'react'
import { CalendarIcon, X } from 'lucide-react'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import { CostFormDataType } from '@/types/FormDataTypes'
import { UseFieldArrayRemove, UseFormReturn } from 'react-hook-form'
import { Switch } from '@/components/ui/switch'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import { formatCurrency } from '@/utils/formatCurrency'

import { dataUtils } from '@/utils/dataUtils'

type Props = {
  index: number
  form: UseFormReturn<CostFormDataType>
  remove: UseFieldArrayRemove
  edit: boolean
}

export const CostsFormFields = ({ index, remove, form, edit }: Props) => {
  return (
    <>
      {index === 0 ? (
        ''
      ) : (
        <span onClick={() => remove(index)} className="flex justify-end">
          <X className="h-4 w-4 cursor-pointer text-destructive" />
        </span>
      )}
      <FormField
        control={form.control}
        name={`costs.${index}.name`}
        render={({ field }) => (
          <FormItem>
            {edit && <FormLabel>Nome da Despesa</FormLabel>}
            <FormControl>
              <Input placeholder="Despesa" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex items-start justify-between gap-1 ">
        <FormField
          control={form.control}
          name={`costs.${index}.value`}
          render={({ field }) => (
            <FormItem className="top-0 flex-1">
              {edit && <FormLabel>Valor</FormLabel>}
              <FormControl>
                <Input
                  placeholder="Valor"
                  {...field}
                  value={edit ? formatCurrency(field.value) : field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`costs.${index}.date`}
          render={({ field }) => (
            <FormItem className="top-0 flex-1">
              {edit && <FormLabel>Data</FormLabel>}
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      disabled={edit}
                      variant={'outline'}
                      className={cn(
                        'w-full pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value ? (
                        dataUtils.formatFormData(field.value)
                      ) : (
                        <span>Data</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={new Date(field.value)}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name={`costs.${index}.recurrent`}
        render={({ field }) => (
          <FormItem className="flex items-center justify-end text-muted-foreground">
            <div className="flex items-center gap-1">
              <FormLabel>Despesa recorrente?</FormLabel>
              <FormControl>
                <Switch
                  disabled={!field.value}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </div>
          </FormItem>
        )}
      />
      <div className="m-auto my-1 w-2/3 border-t-2 border-dashed"></div>
    </>
  )
}
