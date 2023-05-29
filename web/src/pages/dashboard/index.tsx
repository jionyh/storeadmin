import { Layout } from '@/layout/Layout'
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'

const Config = () => {
  return (
    <Layout title="Dashboard">
      <Box mt="10px">
        <Tabs isFitted variant="line">
          <TabList mb="1em">
            <Tab>Categorias</Tab>
            <Tab>Produtos</Tab>
            <Tab>Usuários</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <p>one!</p>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <p>3</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Layout>
  )
}

export default Config
