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
  TagRightIcon,
  Text,
} from '@chakra-ui/react'
import { TbMoneybag } from 'react-icons/tb'
import dayjs from 'dayjs'
import { useContext, useEffect, useState } from 'react'
import { BiPurchaseTag } from 'react-icons/bi'

export default function Home() {
  const { state } = useContext(Context)

  const [message, setMessage] = useState('')

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

  useEffect(() => {
    checkDayOrNight()
  }, [])
  return (
    <Layout>
      <Box p="2px">
        <Alert status="warning" variant="left-accent" mb="10px">
          <AlertIcon />
          <Text align="right" fontSize="md" lineHeight={6} fontStyle="normal">
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
                Dia - <strong>€ 0,00</strong>
              </Text>
              <Text>
                7 Dias - <strong>€ 8,00</strong>
              </Text>
              <Text>
                30 Dias - <strong>€ 63,00</strong>
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
                Dia - <strong>€ 0,00</strong>
              </Text>
              <Text>
                7 Dias - <strong>€ 8,00</strong>
              </Text>
              <Text>
                30 Dias - <strong>€ 63,00</strong>
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
            <Flex alignItems="center" justifyContent="space-evenly" gap="5px">
              <Text
                align="right"
                color="gray.900"
                fontSize="md"
                lineHeight={6}
                fontStyle="normal"
                fontWeight="bold"
              >
                Detalhes de
              </Text>
              <Select width="auto" variant="filled" color="green.800">
                <option>Compras</option>
                <option>Vendas</option>
              </Select>
              <Select width="auto" variant="filled" color="green.800">
                <option>Dia</option>
                <option defaultChecked>Ultimos 7 dias</option>
                <option>Ultimos 30 dias</option>
              </Select>
            </Flex>
          </CardHeader>
          <CardBody border="1px" borderColor="blackAlpha.300">
            <Center flexDirection="column" gap="10px">
              <Select width="200px" variant="filled" color="gray.800">
                <option>Categoria</option>
                <option defaultChecked>Ultimos 7 dias</option>
                <option>Ultimos 30 dias</option>
              </Select>
              <DoughnutChart />
            </Center>
          </CardBody>
        </Card>
      </Box>
    </Layout>
  )
}
