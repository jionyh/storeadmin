import React from 'react'
import { Payments, SaleListPost } from '@/types/SaleType'
import {
  Box,
  Center,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stack,
} from '@chakra-ui/react'

export type Props = {
  paymentOptions: Payments[]
  index: number
  handleAdd: (e: any, index: any) => void
  state: SaleListPost
  disabled: boolean
}

export const VendasInput = ({
  paymentOptions,
  handleAdd,
  index,
  state,
  disabled,
}: Props) => {
  const handleAddProducts = (e: React.ChangeEvent) => {
    handleAdd(e, index)
  }
  return (
    <Box className="w-full p-2">
      <Stack>
        <Select
          required
          isDisabled={disabled}
          border="1px"
          borderColor="gray.300"
          name="paymentId"
          variant="filled"
          placeholder="Selecione a forma de pagamento"
          value={state.paymentId}
          onChange={(e: React.ChangeEvent) => handleAddProducts(e)}
        >
          <>
            {paymentOptions.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </>
        </Select>
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
