'use client'
import { RiShoppingBasketFill } from 'react-icons/ri'
import { BsClipboard2DataFill, BsFillCartPlusFill } from 'react-icons/bs'
import Menu from './Menu'
import { MenuList } from './MenuList'
import { FaUserEdit, FaSignOutAlt, FaCogs } from 'react-icons/fa'
import { GiWallet } from 'react-icons/gi'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function Header() {
  const params = useParams()

  return (
    <header className="flex h-20 items-center justify-between bg-red-400 px-2">
      <Menu position="left" icon>
        <MenuList href={`/compras`}>
          <RiShoppingBasketFill size={20} />
          <span>Compras</span>
        </MenuList>
        <MenuList href={`/vendas`}>
          <BsFillCartPlusFill size={20} />
          <span>Vendas</span>
        </MenuList>
        <MenuList>
          <GiWallet size={20} />
          <span>Despesas</span>
        </MenuList>
        <MenuList>
          <BsClipboard2DataFill size={20} />
          <span>Relatórios</span>
        </MenuList>
        <MenuList>
          <FaCogs size={20} />
          <span>Configurações</span>
        </MenuList>
      </Menu>
      <Link
        href={'/'}
        className="flex flex-col items-center justify-center text-white"
      >
        <Image alt="" width={25} height={25} src="/assets/logo_branco.png" />
        <span className="text-sm leading-relaxed">STOREADMIN</span>
      </Link>
      <Menu>
        <Link href={'https://www.google.com.br'}>
          <MenuList>
            <FaUserEdit size={20} />
            <span>Perfil</span>
          </MenuList>
        </Link>
        <MenuList>
          <FaSignOutAlt size={20} />
          <span>Sair</span>
        </MenuList>
      </Menu>
    </header>
  )
}
