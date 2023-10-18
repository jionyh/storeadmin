"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import Link from "next/link";
import { DefaultTable } from "@/components/configPage/defaultTable";
import { useCategory } from "@/utils/queries/category";
import { usePathname } from "next/navigation";

function Categorias() {
  const categories = useCategory()
  const path = usePathname()

  const handleCategoryDelete = (id:number)=>{
    console.log(`Deletando categoria ${id}`)
  }

  return (
    <div className="mb-3 w-full px-5">
      <Link className="my-5 flex items-center justify-end" href={`${path}/add`}>
        <Button size="sm" variant='outline'><Plus className="h-3 w-3 text-inherit"/> Adicionar Categoria</Button>
      </Link>
      {categories.data && <DefaultTable handleDelete={handleCategoryDelete} title="categorias" data={categories.data.categories}/>}
    </div>
  );
}

export default Categorias
