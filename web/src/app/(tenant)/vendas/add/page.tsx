'use client'
import { Loader } from '@/components/Loader'
import { PageHeader } from '@/components/PageHeader'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { usePayments } from '@/utils/queries/payments'
import { useRef } from 'react'

export default function AddSales() {
  const { data, isLoading, isError } = usePayments()
  const paymentRef = useRef<HTMLSelectElement | null>(null)
  const valueRef = useRef<HTMLInputElement | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log({
      tipoPagamento: paymentRef.current?.value,
      valor: valueRef.current?.value,
    })
  }

  return (
    <div>
      <PageHeader name="Adicionar vendas" />
      {isLoading && <Loader visible />}
      {data && (
        <form className="flex w-full flex-col items-center justify-center gap-2 p-4">
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Forma de Pagamento" />
            </SelectTrigger>
            <SelectContent>
              {data.paymentMethods.map((item) => (
                <SelectItem key={item.id} value={item.id.toString()}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input ref={valueRef} type="text" placeholder="Valor" />
          <div className="my-1 w-2/3 border-t-2 border-dashed border-slate-500"></div>
          <div className="flex w-full items-center justify-end gap-1">
            <button className="rounded bg-blue-500 p-2 text-sm font-bold text-white shadow hover:bg-blue-400">
              Novo Campo
            </button>
            <button className="rounded bg-green-500 p-2 text-sm font-bold text-white shadow hover:bg-green-400">
              Salvar
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
