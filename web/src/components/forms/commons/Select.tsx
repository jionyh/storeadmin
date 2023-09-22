import { FormItem, FormControl, FormMessage } from '@/components/ui/form'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { undefined } from 'zod'

type Props = {
  data: any[]
  placeholder?: string
  onChange: any
}

export const CommonSelect = ({ data, onChange }: Props) => {
  return (
    <FormItem>
      <Select onValueChange={onChange}>
        <FormControl>
          <SelectTrigger>Selecione uma Categoria</SelectTrigger>
        </FormControl>
        <SelectContent>
          {data.map((item) => (
            <SelectItem key={item.id} value={item.id.toString()}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
        <FormMessage />
      </Select>
    </FormItem>
  )
}
