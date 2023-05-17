import { ProductType } from '@/types/ProductType'
import { UnitType } from '@/types/UnitType'
import { useState } from 'react'

export type Props = {
  product: string
  setProduct: (e: string) => void
  productList: ProductType[]
  unit: string
  setUnit: (e: string) => void
  unitList: UnitType[]
  loadingProducts: boolean
  loading: boolean
}

export const ComprasInput = ({
  product,
  setProduct,
  productList,
  unit,
  setUnit,
  unitList,
  loading,
  loadingProducts,
}: Props) => {
  const [qtd, setQtd] = useState('')

  return (
    <div className="w-full">
      <div className="">
        <select
          className="my-2 w-full border p-2 focus:outline-none"
          name="product"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
        >
          {loadingProducts && <option>{product}</option>}
          {!loadingProducts && productList !== undefined && (
            <>
              {productList.map((prod) => (
                <option key={prod.id} value={prod.id}>
                  {prod.name}
                </option>
              ))}
            </>
          )}
        </select>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <select
          className="flex-1 border-2 p-2 focus:outline-none"
          name="unit"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        >
          {loading && <option>{unit}</option>}
          {!loading && unitList !== undefined && (
            <>
              {unitList.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </>
          )}
        </select>
        <input
          className="border-2 p-2 focus:outline-none"
          type="text"
          name="qtd"
          value={qtd}
          onChange={(e) => setQtd(e.target.value)}
          placeholder="Quantidade"
        />
        <input
          className="flex-1 border-2 p-2 focus:outline-none"
          type="text"
          name="valor"
          placeholder="Valor"
        />
      </div>
    </div>
  )
}
