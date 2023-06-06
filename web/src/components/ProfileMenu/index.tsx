import { FaUserEdit, FaSignOutAlt } from 'react-icons/fa'
import Link from 'next/link'
import { Menu, MenuButton, MenuList, MenuItem, Avatar } from '@chakra-ui/react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { Context } from '@/contexts/UserContext'
import { useContext } from 'react'

export const ProfileMenu = () => {
  const { state } = useContext(Context)
  const router = useRouter()
  const logout = () => {
    Cookies.remove('token')
    router.push('/login')
  }
  return (
    <Menu>
      <MenuButton>
        <Avatar
          size={'md'}
          bg={'whiteAlpha.900'}
          color={'red.500'}
          name={state.user.name}
          src="https://bit.ly/broken-link"
        />
      </MenuButton>
      <MenuList>
        <Link href="/perfil">
          <MenuItem color="red.500" icon={<FaUserEdit size={20} />}>
            <span>Perfil</span>
          </MenuItem>
        </Link>
        <MenuItem
          onClick={logout}
          color="red.500"
          icon={<FaSignOutAlt size={20} />}
        >
          <span>Sair</span>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
