/* eslint-disable react-hooks/exhaustive-deps */
import { DoughnutChart } from '@/components/Charts/doughnut'
import { Context } from '@/contexts/UserContext'
import { Layout } from '@/layout/Layout'
import {
  Alert,
  AlertIcon,
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Divider,
  Flex,
  Select,
  SimpleGrid,
  Tag,
  TagLeftIcon,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { TbMoneybag } from 'react-icons/tb'
import dayjs from 'dayjs'
import { useContext, useEffect, useState } from 'react'
import { BiPurchaseTag } from 'react-icons/bi'
import { Loader } from '@/components/Loader'
import api from '@/libs/axios'
import { CategoryType } from '@/types/UnitType'
import { ReportType } from '@/types/ReportsType'

export default function Home() {
  const { state } = useContext(Context)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState<string | undefined>(undefined)
  const day = dayjs().format('YYYY-MM-DD')

  const [sales, setSales] = useState({
    totalDay: '',
    totalWeek: '',
    totalMonth: '',
  })
  const [purchases, setPurchases] = useState({
    totalDay: '',
    totalWeek: '',
    totalMonth: '',
  })
  const [formData, setFormData] = useState({
    type: 'purchase',
    time: 'day',
    category: 'all',
  })

  const [reportData, setReportData] = useState<ReportType>({
    category: '',
    labels: [],
    data: [],
  })

  const [categories, setCategories] = useState<CategoryType[]>([])

  const loader = useDisclosure()

  const checkDayOrNight = () => {
    const hour = dayjs().hour()

    if (hour >= 6 && hour < 12) {
      setMessage('Bom dia')
    } else if (hour >= 12 && hour < 18) {
      setMessage('Boa tarde')
    } else {
      setMessage('Boa noite')
    }

    // hour >= 6 && hour < 12 ? setMessage('Bom dia') : setMessage('Boa noite')
  }

  const fetchData = async () => {
    setLoading(true)
    loader.onOpen()
    try {
      const resSales = await api.get(`/reports/sales?date=${day}`)
      const resPurchases = await api.get(`/reports/purchases?date=${day}`)
      const resCategories = await api.get('/category')

      if (resSales && resPurchases && resCategories) {
        setSales(resSales.data.data)
        setPurchases(resPurchases.data.data)
        setCategories(resCategories.data.data)
        loader.onClose()
        setLoading(false)
      }
    } catch (e) {
      setErrors('Não foi possível atender a solicitação no momento')
      loader.onClose()
      setLoading(false)
    }
  }

  const fetchReportdata = async () => {
    loader.onOpen()
    const queryString = `?type=${formData.type}&time=${formData.time}&category=${formData.category}`
    try {
      const res = await api.get(`/reports${queryString}`)
      setReportData(res.data)
      loader.onClose()
    } catch (e) {
      loader.onClose()
    }
  }

  const handleFormData = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    checkDayOrNight()
    fetchData()
    fetchReportdata()
  }, [])
  useEffect(() => {
    fetchReportdata()
  }, [formData])

  return (
    <Layout>
      <>
        {!loading && errors && <p>{errors}</p>}
        {!loading && !errors && (
          <Box p="2px">
            <Alert status="warning" variant="left-accent" mb="10px">
              <AlertIcon />
              <Text
                align="right"
                fontSize="md"
                lineHeight={6}
                fontStyle="normal"
              >
                {message}, {state.user.name}
              </Text>
            </Alert>
            <SimpleGrid columns={2} spacing={5}>
              <Card variant="elevated" background="blue.100" p="10px">
                <CardHeader p="5px">
                  <Tag
                    size="md"
                    borderRadius="lg"
                    variant="solid"
                    colorScheme="blue"
                  >
                    <TagLeftIcon as={TbMoneybag} m="0px" />
                    <Text
                      pl="5px"
                      align="left"
                      fontSize="md"
                      lineHeight={6}
                      fontStyle="normal"
                      fontWeight="bold"
                    >
                      Vendas
                    </Text>
                  </Tag>
                  <Divider py="2px" />
                </CardHeader>
                <CardBody p="5px">
                  <Text>
                    Dia -{' '}
                    <strong>€ {parseFloat(sales.totalDay).toFixed(2)}</strong>
                  </Text>
                  <Text>
                    7 Dias -{' '}
                    <strong>€ {parseFloat(sales.totalWeek).toFixed(2)}</strong>
                  </Text>
                  <Text>
                    30 Dias -{' '}
                    <strong>€ {parseFloat(sales.totalMonth).toFixed(2)}</strong>
                  </Text>
                </CardBody>
              </Card>
              <Card variant="elevated" background="blue.100" p="10px">
                <CardHeader p="5px">
                  <Tag
                    size="md"
                    borderRadius="lg"
                    variant="solid"
                    colorScheme="blue"
                  >
                    <TagLeftIcon as={BiPurchaseTag} m="0px" />
                    <Text
                      pl="5px"
                      align="left"
                      fontSize="md"
                      lineHeight={6}
                      fontStyle="normal"
                      fontWeight="bold"
                    >
                      Compras
                    </Text>
                  </Tag>
                  <Divider py="2px" />
                </CardHeader>
                <CardBody p="5px">
                  <Text>
                    Dia -{' '}
                    <strong>
                      € {parseFloat(purchases.totalDay).toFixed(2)}
                    </strong>
                  </Text>
                  <Text>
                    7 Dias -{' '}
                    <strong>
                      € {parseFloat(purchases.totalWeek).toFixed(2)}
                    </strong>
                  </Text>
                  <Text>
                    30 Dias -{' '}
                    <strong>
                      € {parseFloat(purchases.totalMonth).toFixed(2)}
                    </strong>
                  </Text>
                </CardBody>
              </Card>
            </SimpleGrid>
            <Card>
              <CardHeader
                background="green.100"
                w="100%"
                p="10px"
                mt="10px"
                roundedTop="lg"
              >
                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  gap="5px"
                >
                  <Text
                    align="right"
                    color="gray.900"
                    fontSize="md"
                    lineHeight={6}
                    fontStyle="normal"
                    fontWeight="bold"
                  >
                    Detalhes das
                  </Text>
                  <Select
                    width="150px"
                    variant="filled"
                    color="green.800"
                    name="type"
                    value={formData.type}
                    onChange={handleFormData}
                  >
                    <option value="purchase">Compras</option>
                    <option value="sale">Vendas</option>
                  </Select>
                  <Text
                    align="right"
                    color="gray.900"
                    fontSize="md"
                    lineHeight={6}
                    fontStyle="normal"
                    fontWeight="bold"
                  >
                    de
                  </Text>
                  <Select
                    width="150px"
                    variant="filled"
                    color="green.800"
                    name="time"
                    value={formData.time}
                    onChange={handleFormData}
                  >
                    <option value="day">1 Dia</option>
                    <option value="week">7 dias</option>
                    <option value="month">30 dias</option>
                  </Select>
                </Flex>
              </CardHeader>
              <CardBody border="1px" borderColor="blackAlpha.300">
                <Center flexDirection="column" gap="10px">
                  {formData.type === 'purchase' ? (
                    <Select
                      width="200px"
                      color="gray.800"
                      size="sm"
                      name="category"
                      value={formData.category}
                      onChange={handleFormData}
                    >
                      <option value="all">Todas as categorias</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </Select>
                  ) : (
                    ''
                  )}
                  <DoughnutChart data={reportData.data} />
                </Center>
              </CardBody>
            </Card>
          </Box>
        )}
        <Loader obj={loader} />
      </>
    </Layout>
  )
}
