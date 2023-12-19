import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { PenSquare, XSquare } from 'lucide-react'

type Data = {
  id: number
  name: string
  abbreviation?: string
}

type Props = {
  data: Data[]
  title: string
  handleDelete: (id: number) => void
}
export const DefaultTable = ({ data, title, handleDelete }: Props) => {
  return (
    <Table className="border border-primary">
      <TableCaption>Lista de {title} cadastradas</TableCaption>
      <TableHeader className="pointer-events-none">
        <TableRow className="h-5 border border-primary bg-primary text-xs">
          <TableHead className="text-primary-foreground">
            {title.toUpperCase()}
          </TableHead>
          <TableHead className="text-left text-primary-foreground">
            {title === 'unidades' ? 'ABREV.' : ''}
          </TableHead>
          <TableHead></TableHead>
          <TableHead className="text-center text-primary-foreground">
            OPÇÕES
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((data) => (
          <TableRow
            key={data.id}
            className="odd:bg-primary/5 even:bg-primary/10"
          >
            <TableCell className="text-xs">{data.name}</TableCell>
            <TableCell className="text-left text-xs">
              {data.abbreviation ? data.abbreviation : ''}
            </TableCell>
            <TableCell></TableCell>
            <TableCell className="flex items-center justify-center gap-1">
              <div title="Deletar">
                <XSquare
                  onClick={() => handleDelete(data.id)}
                  className="h-5 w-5 cursor-pointer text-destructive"
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
