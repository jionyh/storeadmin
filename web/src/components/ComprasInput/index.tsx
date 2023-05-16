import { ProductType } from '@/types/ProductType'
import { UnitType } from '@/types/UnitType'

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

export const ComprasInput = ({ product, setProduct, productList, unit, setUnit, unitList, loading, loadingProducts }: Props) => {
  return (
    <div className='w-full'>
      <div className=''>
        <select
          className='p-2 border w-full my-2 focus:outline-none'
          value={product}
          onChange={(e) => setProduct(e.target.value)}>
          {loadingProducts && <option>{product}</option>}
          {!loadingProducts && productList != undefined && (
            <>
              {productList.map((prod) => (
                <option
                  key={prod.id}
                  value={prod.id}>
                  {prod.name}
                </option>
              ))}
            </>
          )}
        </select>
      </div>
      <div className='flex items-center flex-wrap gap-2'>
        <select
          className='p-2 flex-1 border-2 focus:outline-none'
          value={unit}
          onChange={(e) => setUnit(e.target.value)}>
          {loading && <option>{unit}</option>}
          {!loading && unitList != undefined && (
            <>
              {unitList.map((item) => (
                <option
                  key={item.id}
                  value={item.id}>
                  {item.name}
                </option>
              ))}
            </>
          )}
        </select>
        <input
          className='p-2 border-2 focus:outline-none'
          type='text'
          placeholder='Quantidade'
        />
        <input
          className='p-2 border-2 flex-1 focus:outline-none'
          type='text'
          placeholder='Valor'
        />
      </div>
    </div>
  )
}
