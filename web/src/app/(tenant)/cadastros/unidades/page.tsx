"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import Link from "next/link";
import { DefaultTable } from "@/components/configPage/defaultTable";
import { useUnits } from "@/utils/queries/units";
import { usePathname } from "next/navigation";

function Unidades() {
  const units = useUnits()
  const path = usePathname()

  const handleUnitDelete = (id:number)=>{
    console.log(`Deletando unidade ${id}`)
  }
  return (
    <div className="mb-3 w-full px-5">
      <Link className="my-5 flex items-center justify-end" href={`${path}/add`}>
        <Button size="sm" variant='outline'><Plus className="h-3 w-3 text-inherit"/>Adicionar Unidade</Button>
      </Link>
      {units.data && 
      <DefaultTable 
      handleDelete={handleUnitDelete} 
      title="unidades" 
      data={units.data.units}/>}
    </div>
  );
}

export default Unidades
