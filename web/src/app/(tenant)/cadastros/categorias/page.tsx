'use client'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

import { DefaultTable } from '@/components/configPage/defaultTable'
import { useCategory } from '@/utils/queries/category'
import { ModalForm } from '@/components/modalForm/ModalForm'
import { useState } from 'react'
import { CategoriesFormMain } from '@/components/forms/categories/CategoriesFormMain'

function Categorias() {
  const categories = useCategory()
  const { data: categoryData, isLoading: categoryLoading } = useCategory()
  const [categoryActive, setCategoryActive] = useState<
    Array<{ id: number; name: string }>
  >([])

  const [open, setOpen] = useState(false)

  const handleCategoryDelete = (id: number) => {
    setCategoryActive([])
    if (categoryLoading) return
    const cat = categoryData.categories.filter((cat) => cat.id === id)
    setCategoryActive(cat)
    setOpen(true)
  }

  const handleButtonAddClick = () => {
    setCategoryActive([])
    setOpen(true)
  }

  return (
    <div className="mb-3 w-full px-5">
      <div className="my-5 flex items-center justify-end">
        <Button onClick={handleButtonAddClick} size="sm" variant="outline">
          <Plus className="h-3 w-3 text-inherit" /> Adicionar Categoria
        </Button>
      </div>
      {categories.data && (
        <DefaultTable
          handleDelete={handleCategoryDelete}
          title="categorias"
          data={categories.data.categories}
        />
      )}

      <ModalForm open={open} setOpen={setOpen}>
        <CategoriesFormMain initialData={categoryActive} />
      </ModalForm>
    </div>
  )
}

export default Categorias
