import { ClipboardList } from 'lucide-react'
import { BiTaskX } from 'react-icons/bi'
type Props = {
  title?: string
}
export const Empty = ({ title = 'compras' }: Props) => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <ClipboardList className="h-20 w-20 text-slate-400" />
        <p className="text-lg font-bold leading-relaxed text-gray-500">
          Não há {title} para esse dia
        </p>
      </div>
    </div>
  )
}
