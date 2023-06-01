/* eslint-disable react-hooks/exhaustive-deps */
import { DashboardModal } from '@/components/DashboardModal'
import { Loader } from '@/components/Loader'
import { TableDashboard } from '@/components/TableDashboard'
import { Layout } from '@/layout/Layout'
import api from '@/libs/axios'
import { InfoModal } from '@/types/Dashboard'
import { CategoryType } from '@/types/UnitType'
import { Search2Icon } from '@chakra-ui/icons'
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

const Config = () => {
  const loader = useDisclosure()
  const modal = useDisclosure()
  const [activeTab, setActiveTab] = useState({
    endpoint: 'category',
    title: 'Categorias',
  })
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<CategoryType[]>([])
  const [filtredData, setFiltredData] = useState<CategoryType[]>([])
  const [info, setInfo] = useState<InfoModal>({ title: '', id: 0, name: '' })
  const [search, setSearch] = useState('')

  const fetchData = async () => {
    setLoading(true)
    loader.onOpen()
    if (activeTab.endpoint === 'user') {
      loader.onClose()
      setLoading(false)
      return
    }

    const res = await api.get(`/${activeTab.endpoint}`)
    if (res.data.success) {
      setData(res.data.data)
      setFiltredData(res.data.data)
      setLoading(false)
      loader.onClose()
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    const d = data.filter((item) => {
      return item.name.toLowerCase().includes(search.toLowerCase())
    })
    setFiltredData(d)
  }

  const handleTabClick = (endpoint: string, title: string) => {
    setLoading(true)
    loader.onOpen()
    setActiveTab({
      endpoint,
      title,
    })
  }

  const handleAdd = async () => {
    const modalData: any = {
      title: activeTab.title,
      id: '',
      name: '',
      cat: '',
      abb: '',
    }
    setInfo(modalData)
    modal.onOpen()
  }

  useEffect(() => {
    setFiltredData(data)
    fetchData()
  }, [activeTab])

  useEffect(() => {
    if (filtredData.length === 0 || search.length === 0) {
      setFiltredData(data)
    }
  }, [filtredData])

  return (
    <>
      <Layout title="Dashboard">
        <>
          <Box mt="10px">
            <Tabs isFitted variant="line">
              <TabList mb="1em">
                <Tab onClick={() => handleTabClick('category', 'Categorias')}>
                  Categorias
                </Tab>
                <Tab onClick={() => handleTabClick('product', 'Produtos')}>
                  Produtos
                </Tab>
                <Tab onClick={() => handleTabClick('unit', 'Unidades')}>
                  Unidades
                </Tab>
                <Tab onClick={() => handleTabClick('user', 'Usuarios')}>
                  Usuários
                </Tab>
              </TabList>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Search2Icon color="gray.300" />
                </InputLeftElement>
                <Input
                  placeholder="Pesquisar..."
                  type="text"
                  value={search}
                  onChange={handleSearch}
                />
              </InputGroup>
              {loading && null}
              {!loading && (
                <TabPanels>
                  <TabPanel>
                    <TableDashboard
                      title="Categorias"
                      link={activeTab.endpoint}
                      data={filtredData}
                      fn={handleAdd}
                    />
                  </TabPanel>
                  <TabPanel>
                    <TableDashboard
                      title="Produtos"
                      link={activeTab.endpoint}
                      data={filtredData}
                      fn={handleAdd}
                    />
                  </TabPanel>
                  <TabPanel>
                    <TableDashboard
                      title="Unidades"
                      link={activeTab.endpoint}
                      data={filtredData}
                      fn={handleAdd}
                    />
                  </TabPanel>
                  <TabPanel>
                    <p>Em Construção...</p>
                  </TabPanel>
                </TabPanels>
              )}
            </Tabs>
          </Box>
        </>
      </Layout>
      <DashboardModal obj={modal} info={info} create={true} fn={fetchData} />
      <Loader obj={loader} />
    </>
  )
}

export default Config
