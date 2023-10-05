'use client'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { signOut, useSession } from 'next-auth/react'
import { Cog, LogOut, UserCog } from 'lucide-react'
import { getInitials } from '@/utils/getInitials'
import { capitalize } from '@/utils/capitalizeNames'
import { Loader } from '../Loader'

export const UserMenu = () => {
  const { data } = useSession()

  if (!data) return <Loader visible />

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="text-white hover:bg-transparent hover:text-white"
        >
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-white text-lg text-primary ">
              {getInitials(data.user.name)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-fit min-w-[170px]"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal text-primary">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {capitalize(data.user.name)}
            </p>
            <p className="text-xs leading-none">{data.user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="text-primary">
          <DropdownMenuItem className="flex cursor-pointer items-center gap-2 hover:bg-primary/5 hover:text-primary">
            <UserCog className="h-5 w-5" />
            Perfil
          </DropdownMenuItem>
          <DropdownMenuItem className="flex cursor-pointer items-center gap-2 hover:bg-primary/5 hover:text-primary">
            <Cog className="h-5 w-5" />
            Configurações
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="flex cursor-pointer items-center gap-2 text-primary hover:bg-primary/5 hover:text-primary"
        >
          <LogOut className="h-5 w-5" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
