"use client";
import { productsApi } from "@/utils/api/products";
import { Products, createColumns } from "./columns";
import { DataTable } from "./data-table";
import { useGetAllProducts } from "@/utils/queries/products";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default async function Produtos() {
  const products = useGetAllProducts();

  const data: Products[] = [];

  if (products.data) {
    products.data.products.products.forEach((product) => {
      data.push({
        id: product.id,
        name: product.name,
        category: product.category.name,
      });
    });
  }

  const handleProductDelete = (id:number)=>{
    console.log(`Deletando o produto ${id}`)
  }

  const columns = createColumns(handleProductDelete);

  return (
    <div className="mb-3 w-full px-5">
      <Link className="my-5 flex items-center justify-end" href="/vendas/add">
        <Button size="sm" variant="outline">
          <Plus className="h-3 w-3 text-inherit" /> Adicionar Produto
        </Button>
      </Link>
      {products.data && <DataTable columns={columns} data={data} />}
    </div>
  );
}
