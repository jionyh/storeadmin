import { ComprasInput } from '@/components/ComprasInput'
import { Layout } from '@/layout/Layout'
import { ProductType } from '@/types/ProductType'
import { CategoryType, UnitType } from '@/types/UnitType'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AdicionarCompras = () => {
  const [unitList, setUnitList] = useState<UnitType[]>()
  const [categoryList, setCategoryList] = useState<CategoryType[]>()
  const [productList, setProductList] = useState<ProductType[]>()
  const [activeCategory, setActiveCategory] = useState('1')

  const [unit, setUnit] = useState('Selecione a unidade')
  const [product, setProduct] = useState('Selecione o produto')

  const [loading, setLoading] = useState(true)
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [loadingPage, setLoadingPage] = useState(true)
  const [error, setError] = useState('')

  const fetchData = async () => {
    setLoading(true)
    try {
      let res = await axios.get('https://localhost:4001/unit')
      setUnitList(res.data.data)
      setLoading(false)

      return
    } catch (e) {
      setError('Falha ao carregar!')
    }
    setLoading(false)
  }

  const fetchCategories = async () => {
    setLoadingPage(true)

    try {
      const res = await axios.get(`https://localhost:4001/categories/`)
      setCategoryList(res.data.data)
    } catch (e) {
      setError('Falha')
    }

    setLoadingPage(false)
  }

  const fetchProductsData = async () => {
    setLoadingProducts(true)
    setProduct('Carregando...')
    try {
      let res = await axios.get(`https://localhost:4001/categories/sub?cat=${activeCategory}`)
      setProductList(res.data.data)
      setLoadingProducts(false)

      return
    } catch (e) {
      setError('Falha ao carregar!')
    }
    setLoadingProducts(false)
  }

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUnit(e.target.value)
  }

  useEffect(() => {
    fetchCategories()
    fetchData()
  }, [])

  useEffect(() => {
    fetchProductsData()
  }, [activeCategory])

  return (
    <Layout title='Adicionar Compras'>
      <>
        {loadingPage && <div>Carregando</div>}
        {!loadingPage && (
          <>
            <hr className='mb-4' />
            <div className='flex items-center justify-center gap-0.5 text-sm'>
              {categoryList!.map((cat) => (
                <button
                  key={cat.id}
                  className='p-1 border h-12'
                  onClick={() => setActiveCategory(cat.id.toString())}>
                  {cat.name}
                </button>
              ))}
            </div>
            <ComprasInput
              loading={loading}
              loadingProducts={loadingProducts}
              product={product}
              setProduct={setProduct}
              productList={productList!}
              unit={unit}
              setUnit={setUnit}
              unitList={unitList!}
            />
          </>
        )}
      </>
    </Layout>
  )
}

export default AdicionarCompras
