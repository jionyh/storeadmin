import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, XSquare } from "lucide-react";

export interface Products {
  id: number;
  options?: any;
  name: string;
  category: string;
}

export const createColumns = (handleDelete: (id: number) => void): ColumnDef<Products>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          size="sm"
          className="text-sm hover:bg-transparent hover:text-primary-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          produto
          <ArrowUpDown className="h-3 w-3" />
        </Button>
    )},
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          size="sm"
          className="text-sm hover:bg-transparent hover:text-primary-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          categoria
          <ArrowUpDown className="h-3 w-3" />
        </Button>
    )},
  },
  {
    accessorKey: "options",
    header: "opções",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div title="Deletar" className="flex items-center justify-center">
          <XSquare
            onClick={() => handleDelete(product.id)}
            className="h-5 w-5 cursor-pointer text-destructive"
          />
        </div>
      );
    },
  },
];
