import { ComprasInput } from '@/components/ComprasInput'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { Layout } from '@/layout/Layout'
import { ProductList } from '@/types/ProductList'
import { ProductType } from '@/types/ProductType'
import { CategoryType, UnitType } from '@/types/UnitType'
import { AddIcon, CheckIcon } from '@chakra-ui/icons'
import { Button, Flex, Wrap } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AdicionarCompras = () => {
  const listInitialState = {
    itemId: '',
    userId: '',
    unitId: '',
    quantity: '',
    value: '',
  }

  const [unitList, setUnitList] = useState<UnitType[]>()
  const [categoryList, setCategoryList] = useState<CategoryType[]>()
  const [productList, setProductList] = useState<ProductType[]>()
  const [activeCategory, setActiveCategory] = useState('1')

  /* State para guardar o array que vai para o backend */
  const [list, setList] = useState<ProductList[]>([listInitialState])

  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true)
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [loadingPage, setLoadingPage] = useState(true)
  const [error, setError] = useState<any>(undefined)

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await axios.get('https://localhost:4001/unit')
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
    setList([listInitialState])
    try {
      const res = await axios.get(
        `https://localhost:4001/categories/sub?cat=${activeCategory}`,
      )
      setProductList(res.data.data)
      setLoadingProducts(false)

      return
    } catch (e) {
      setError('Falha ao carregar!')
    }
    setLoadingProducts(false)
  }

  /* Função para lidar com a adição no array de dados que vai para o backend */
  const handleProductListAdd = (e: any, index: number) => {
    const { name, value } = e.target
    const plist: any = [...list]
    plist[index][name] = value
    setList(plist)
  }

  /* Função para adicionar novos campos ao form */
  const handleAddInputs = () => {
    setList([...list, listInitialState])
    console.log(list)
  }

  /* Função que envia os dados para o backend */
  const handleSaveInputs = () => {
    for (const i in list) {
      const msg = {
        item: list[i].itemId,
        quantidade: list[i].quantity,
        unidade: list[i].unitId,
        valor: list[i].value,
      }
      console.log('msg', msg)
    }
    console.log('list', list)
  }

  useEffect(() => {
    fetchCategories()
    fetchData()
  }, [])

  useEffect(() => {
    fetchProductsData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory])

  return (
    <Layout title="Adicionar Compras">
      <>
        {error && <div>Não foi possivel atender a sua solicitação</div>}
        {loadingPage && <LoadingSpinner />}
        {!loadingPage && !error && (
          <>
            <hr className="mb-4" />
            <div className="flex items-center justify-center gap-0.5 text-sm">
              <Wrap spacing="2px" justify="center">
                {categoryList!.map((cat, i) => (
                  <Button
                    size="sm"
                    colorScheme="blue"
                    rounded="0px"
                    variant="outline"
                    isActive={activeCategory === cat.id.toString()}
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id.toString())}
                  >
                    {cat.name}
                  </Button>
                ))}
              </Wrap>
            </div>
            {!loadingProducts && (
              <>
                {list.map((list, i) => (
                  <ComprasInput
                    key={i}
                    index={i}
                    state={list}
                    handleAdd={handleProductListAdd}
                    productList={productList!}
                    unitList={unitList!}
                  />
                ))}

                <Flex mr="12px" justify="end" gap="8px">
                  <Button
                    size={'sm'}
                    leftIcon={<AddIcon />}
                    colorScheme="blue"
                    onClick={handleAddInputs}
                  >
                    Novo Campo
                  </Button>
                  <Button
                    size={'sm'}
                    leftIcon={<CheckIcon />}
                    colorScheme="green"
                    onClick={handleSaveInputs}
                  >
                    Salvar
                  </Button>
                </Flex>
              </>
            )}
          </>
        )}
      </>
    </Layout>
  )
}

export default AdicionarCompras
