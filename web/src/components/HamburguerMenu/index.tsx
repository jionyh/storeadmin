import { HamburgerIcon } from '@chakra-ui/icons'
import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import Link from 'next/link'

import {
  FaShoppingBasket,
  FaCartPlus,
  FaClipboardCheck,
  FaCogs,
} from 'react-icons/fa'

export const HamburguerMenu = () => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon boxSize={10} />}
        colorScheme="red"
        cursor="pointer"
        variant="unstyled"
      />
      <MenuList color="red.500">
        <Link href={'/vendas'}>
          <MenuItem as="a" icon={<FaShoppingBasket size={20} />}>
            Vendas
          </MenuItem>
        </Link>
        <Link href={'/compras'}>
          <MenuItem as="a" icon={<FaCartPlus size={20} />}>
            Compras
          </MenuItem>
        </Link>
        <Link href={'/relatorios'}>
          <MenuItem as="a" icon={<FaClipboardCheck size={20} />}>
            Relatórios
          </MenuItem>
        </Link>
        <Link href={'/dashboard'}>
          <MenuItem as="a" icon={<FaCogs size={20} />}>
            Configurações
          </MenuItem>
        </Link>
      </MenuList>
    </Menu>
  )
}
