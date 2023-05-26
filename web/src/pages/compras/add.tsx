/* eslint-disable no-prototype-builtins */
import { Alert } from '@/components/Alert'
import { ComprasInput } from '@/components/ComprasInput'
import { Loader } from '@/components/Loader'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { Context } from '@/contexts/UserContext'
import { Layout } from '@/layout/Layout'
import api from '@/libs/axios'
import { ProductList } from '@/types/ProductList'
import { ProductType } from '@/types/ProductType'
import { CategoryType, UnitType } from '@/types/UnitType'
import { AddIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons'
import { Button, Flex, Wrap, useDisclosure, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'

const AdicionarCompras = () => {
  const { state } = useContext(Context)
  const router = useRouter()
  const alert = useDisclosure()
  const loader = useDisclosure()
  const toast = useToast()

  const listInitialState = {
    itemId: '',
    userId: state.user.id.toString(),
    unitId: '',
    quantity: '',
    value: '',
    supplier: '',
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
  const [disabled, setdisabled] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await api.get(`/unit`)
      setUnitList(res.data.data)
      setLoading(false)

      return
    } catch (e) {
      setError('Falha ao carregar!')
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    setLoadingPage(true)

    try {
      const res = await api.get(`/categories/`)
      setCategoryList(res.data.data)
      setLoadingPage(false)
    } catch (e) {
      setError('Falha')
      setLoadingPage(false)
    }
  }

  const fetchProductsData = async () => {
    setLoadingProducts(true)
    setList([listInitialState])
    try {
      const res = await api.get(`/categories/sub?cat=${activeCategory}`)
      setProductList(res.data.data)
      setLoadingProducts(false)

      return
    } catch (e) {
      setError('Falha ao carregar!')
      setLoadingProducts(false)
    }
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
  }

  const handleRemoveInputs = (i: any) => {
    if (i !== 0) {
      const newFormValues = [...list]
      newFormValues.splice(i, 1)
      setList(newFormValues)
    }
  }

  const handleAdd = () => {
    alert.onOpen()
  }

  const fetchPostCreateSale = async () => {
    alert.onClose()
    loader.onOpen()
    setdisabled(true)

    try {
      const res = await api.post(`/compras`, list)

      if (res.data.success) {
        router.replace('/compras')
        setdisabled(false)
        toast({
          title: 'Compra Adiciona com sucesso!',
          status: 'success',
          isClosable: true,
        })
        loader.onClose()
        return
      }
      throw Error(res.data.error)
    } catch (e) {
      toast({
        title: 'Erro ao adicionar a compra. Verifique os campos!',
        status: 'error',
        duration: 6000,
        isClosable: true,
      })
      loader.onClose()
      setdisabled(false)
    }
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
        {error && <div>Não foi possível atender a sua solicitação</div>}
        {loadingPage && <LoadingSpinner />}
        {!loadingPage && !error && (
          <>
            <Wrap mb="20px" spacing="2px" justify="center">
              {categoryList!.map((cat, i) => (
                <Button
                  key={cat.id}
                  size="sm"
                  isDisabled={disabled}
                  colorScheme="blue"
                  rounded="0px"
                  variant="outline"
                  isActive={activeCategory === cat.id.toString()}
                  onClick={() => setActiveCategory(cat.id.toString())}
                >
                  {cat.name}
                </Button>
              ))}
            </Wrap>
            {!loadingProducts && unitList && (
              <>
                {list.map((list, i) => (
                  <React.Fragment key={i}>
                    {i !== 0 && (
                      <div className="flex justify-end pr-4">
                        <CloseIcon
                          cursor="pointer"
                          color="red.500"
                          boxSize={3}
                          onClick={() => handleRemoveInputs(i)}
                        />
                      </div>
                    )}
                    <ComprasInput
                      key={i}
                      index={i}
                      state={list}
                      handleAdd={handleProductListAdd}
                      productList={productList!}
                      unitList={unitList}
                      disabled={disabled}
                    />
                  </React.Fragment>
                ))}

                <Flex mr="12px" justify="end" gap="8px">
                  <Button
                    size={'sm'}
                    isDisabled={disabled}
                    leftIcon={<AddIcon />}
                    colorScheme="blue"
                    onClick={handleAddInputs}
                  >
                    Novo Campo
                  </Button>
                  <Button
                    size={'sm'}
                    isLoading={disabled}
                    loadingText="Salvando dados!"
                    leftIcon={<CheckIcon />}
                    colorScheme="green"
                    onClick={handleAdd}
                  >
                    Salvar
                  </Button>
                </Flex>
              </>
            )}
          </>
        )}
        <Alert
          obj={alert}
          title="Adicionar nova compra?"
          fn={fetchPostCreateSale}
        />
        <Loader obj={loader} />
      </>
    </Layout>
  )
}

export default AdicionarCompras
