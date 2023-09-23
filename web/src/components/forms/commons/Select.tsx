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
  placeholder?: string
  onChange: any
}

export const CommonSelect = ({ data, onChange, placeholder }: Props) => {
  return (
    <FormItem>
      <Select onValueChange={onChange}>
        <FormControl>
          <SelectTrigger>
          <SelectValue placeholder={placeholder} />
          </SelectTrigger>
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
