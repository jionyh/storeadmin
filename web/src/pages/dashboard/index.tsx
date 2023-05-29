/* eslint-disable react-hooks/exhaustive-deps */
import { Loader } from '@/components/Loader'
import { TableDashboard } from '@/components/TableDashboard'
import { Layout } from '@/layout/Layout'
import api from '@/libs/axios'
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
  const [activeTab, setActiveTab] = useState('categories')
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<CategoryType[]>([])
  const [filtredData, setFiltredData] = useState<CategoryType[]>([])
  const [search, setSearch] = useState('')

  const fetchData = async () => {
    setLoading(true)
    loader.onOpen()
    const res = await api.get(`/${activeTab}`)
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

  const handleTabClick = (name: string) => {
    setLoading(true)
    loader.onOpen()
    setActiveTab(name)
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
                <Tab onClick={() => handleTabClick('categories')}>
                  Categorias
                </Tab>
                <Tab onClick={() => handleTabClick('categories/sub')}>
                  Produtos
                </Tab>
                <Tab onClick={() => handleTabClick('unit')}>Unidades</Tab>
                <Tab onClick={() => handleTabClick('user')}>Usuários</Tab>
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
                      link={activeTab}
                      data={filtredData}
                    />
                  </TabPanel>
                  <TabPanel>
                    <TableDashboard
                      title="Produtos"
                      link={activeTab}
                      data={filtredData}
                    />
                  </TabPanel>
                  <TabPanel>
                    <TableDashboard
                      title="Unidades"
                      link={activeTab}
                      data={filtredData}
                    />
                  </TabPanel>
                  <TabPanel>
                    <p>3</p>
                  </TabPanel>
                </TabPanels>
              )}
            </Tabs>
          </Box>
        </>
      </Layout>
      <Loader obj={loader} />
    </>
  )
}

export default Config
