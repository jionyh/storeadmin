import { FormItem, FormControl, FormMessage } from '@/components/ui/form'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'

type Props = {
  data: any[]
  onChange: any
  field: any
  disabled: boolean
}

export const CommonSelect = ({ data, onChange, field, disabled }: Props) => {
  return (
    <FormItem>
      <Select
        disabled={disabled}
        value={field.value.toString()}
        onValueChange={onChange}
      >
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="0" disabled>
            Selecione a Categoria
          </SelectItem>
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
