'use client'
import { Products, createColumns } from './columns'
import { DataTable } from './data-table'
import { useGetAllProducts } from '@/utils/queries/products'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { ProductsFormMain } from '@/components/forms/products/ProductsFormMain'
import { ModalForm } from '@/components/modalForm/ModalForm'
import { ProductsFormDataType } from '@/types/FormDataTypes'

export default function Produtos() {
  const products = useGetAllProducts()
  const [productActive, setProductActive] = useState<
    ProductsFormDataType['products']
  >([])
  const [open, setOpen] = useState(false)

  const data: Products[] = []

  if (products.data) {
    products.data.products.products.forEach((product) => {
      data.push({
        id: product.id,
        name: product.name,
        category: product.category.name,
      })
    })
  }

  const handleProductDelete = (id: number) => {
    setProductActive([])
    if (products.isLoading) return
    const product = products.data.products.products
      .filter((product) => product.id === id)
      .map((product) => ({
        prod_id: product.id.toString(),
        name: product.name,
        category_id: product.category.id,
      }))
    setProductActive(product)
    setOpen(true)
  }

  const handleButtonAddClick = () => {
    setProductActive([])
    setOpen(true)
  }

  const columns = createColumns(handleProductDelete)

  return (
    <div className="mb-3 w-full px-5">
      <div className="my-5 flex items-center justify-end">
        <Button onClick={handleButtonAddClick} size="sm" variant="outline">
          <Plus className="h-3 w-3 text-inherit" /> Adicionar Produto
        </Button>
      </div>
      {products.data && <DataTable columns={columns} data={data} />}
      <ModalForm open={open} setOpen={setOpen}>
        <ProductsFormMain initialData={productActive} />
      </ModalForm>
    </div>
  )
}
