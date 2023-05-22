import { ProductList } from '@/types/ProductList'
import { ProductType } from '@/types/ProductType'
import { UnitType } from '@/types/UnitType'
import {
  Box,
  Center,
  Divider,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Stack,
} from '@chakra-ui/react'
import React, { useState } from 'react'

export type Props = {
  productList: ProductType[]
  unitList: UnitType[]
  index: number
  handleAdd: (e: any, index: any) => void
  state: ProductList
  disabled: boolean
}

export const ComprasInput = ({
  productList,
  unitList,
  handleAdd,
  index,
  state,
  disabled,
}: Props) => {
  const [abbreviation, setAbbreviation] = useState('')

  const handleAddProducts = (e: React.ChangeEvent) => {
    handleAdd(e, index)
  }

  const getAbbreviationFromUnitArray = () => {
    let abb = ''
    if (state.unitId) {
      const id = parseInt(state.unitId)
      const find = unitList.find((el) => el.id === id)
      if (find) {
        abb = find.abbreviation
      }
    }
    setAbbreviation(abb)
  }

  const handleUnitChange = (e: React.ChangeEvent) => {
    handleAddProducts(e)
    getAbbreviationFromUnitArray()
  }

  return (
    <Box className="w-full p-2">
      <Stack>
        <div className="">
          <Select
            required
            isDisabled={disabled}
            border="1px"
            borderColor="gray.300"
            name="itemId"
            variant="filled"
            placeholder="Selecione o produto"
            value={state.itemId}
            onChange={(e: React.ChangeEvent) => handleAddProducts(e)}
          >
            <>
              {productList.map((prod) => (
                <option key={prod.id} value={prod.id}>
                  {prod.name}
                </option>
              ))}
            </>
          </Select>
        </div>
        <Select
          required
          isDisabled={disabled}
          border="1px"
          borderColor="gray.300"
          name="unitId"
          variant="filled"
          placeholder="Selecione a unidade"
          value={state.unitId}
          onChange={handleUnitChange}
        >
          <>
            {unitList.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </>
        </Select>
        <Flex gap="8px">
          <InputGroup>
            <InputRightElement
              paddingRight="20px"
              pointerEvents="none"
              color="gray.400"
              // eslint-disable-next-line react/no-children-prop
              children={abbreviation}
            />
            <Input
              required
              isDisabled={disabled}
              border="1px"
              borderColor="gray.300"
              type="number"
              name="quantity"
              variant="filled"
              value={state.quantity}
              onChange={(e: React.ChangeEvent) => handleAddProducts(e)}
              placeholder="Quantidade"
            />
          </InputGroup>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.400"
              // eslint-disable-next-line react/no-children-prop
              children="€"
            />
            <Input
              required
              isDisabled={disabled}
              border="1px"
              borderColor="gray.300"
              type="number"
              name="value"
              variant="filled"
              value={state.value}
              onChange={(e: React.ChangeEvent) => handleAddProducts(e)}
              placeholder="Valor"
            />
          </InputGroup>
        </Flex>
        <Input
          isDisabled={disabled}
          border="1px"
          borderColor="gray.300"
          type="text"
          name="supplier"
          variant="filled"
          value={state.supplier}
          onChange={(e: React.ChangeEvent) => handleAddProducts(e)}
          placeholder="Fornecedor"
        />
        <Center>
          <Divider
            w={'50%'}
            marginTop={'5px'}
            borderColor={'gray.400'}
            variant={'dashed'}
            borderWidth={'1px'}
          />
        </Center>
      </Stack>
    </Box>
  )
}
