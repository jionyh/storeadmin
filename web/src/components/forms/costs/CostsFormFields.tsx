'use client'
import React from 'react'
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { CostFormDataType } from '@/types/FormDataTypes'
import { UseFieldArrayRemove, UseFormReturn } from 'react-hook-form'
import { Switch } from '@/components/ui/switch'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { cn } from '@/lib/utils'


type Props = {
  index: number
  form: UseFormReturn<CostFormDataType>
  remove: UseFieldArrayRemove
}

export const CostsFormFields = ({ index, remove, form }: Props) => {
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
            <FormControl>
              <Input placeholder="Despesa" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex items-start justify-between gap-1">
        <FormField
          control={form.control}
          name={`costs.${index}.value`}
          render={({ field }) => (
            <FormItem className='flex-1 top-0'>
              <FormControl>
                <Input placeholder="valor" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`costs.${index}.date`}
          render={({ field }) => (
            <FormItem className='flex-1 top-0'>
    <Popover>
    <PopoverTrigger asChild>
      <FormControl>
        <Button
          variant={"outline"}
          className={cn(
            "w-full pl-3 text-left font-normal",
            !field.value && "text-muted-foreground"
          )}
        >
          {field.value ? (
            format(new Date(field.value), "P")
          ) : (
            <span>Selecione a data</span>
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
