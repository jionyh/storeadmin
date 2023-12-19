'use client'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

import { DefaultTable } from '@/components/configPage/defaultTable'
import { useUnits } from '@/utils/queries/units'
import { useState } from 'react'
import { ModalForm } from '@/components/modalForm/ModalForm'
import { UnitsFormMain } from '@/components/forms/units/UnitsFormMain'

function Unidades() {
  const units = useUnits()
  const [open, setOpen] = useState(false)
  const [unitActive, setUnitActive] = useState<
    Array<{ id: number; name: string; abbreviation: string }>
  >([])

  const handleUnitDelete = (id: number) => {
    console.log(`Deletando unidade ${id}`)
  }

  const handleButtonAddClick = () => {
    setOpen(true)
  }

  return (
    <div className="mb-3 w-full px-5">
      <div className="my-5 flex items-center justify-end">
        <Button onClick={handleButtonAddClick} size="sm" variant="outline">
          <Plus className="h-3 w-3 text-inherit" />
          Adicionar Unidade
        </Button>
      </div>
      {units.data && (
        <DefaultTable
          handleDelete={handleUnitDelete}
          title="unidades"
          data={units.data.units}
        />
      )}
      <ModalForm open={open} setOpen={setOpen}>
        <UnitsFormMain initialData={unitActive} />
      </ModalForm>
    </div>
  )
}

export default Unidades
