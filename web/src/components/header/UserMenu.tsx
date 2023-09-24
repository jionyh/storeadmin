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

export const UserMenu = ()=>{
  const {data} = useSession()

  if(!data)return <Loader visible/>
  
  return(
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
    <Button variant="ghost" className="relative h-9 w-9 rounded-full">
        <Avatar className="h-9 w-9">
          <AvatarFallback className='text-primary text-lg'>{getInitials(data.user.name)}</AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-fit min-w-[170px]" align="end" forceMount>
      <DropdownMenuLabel className="font-normal text-primary">
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-medium leading-none">{capitalize(data.user.name)}</p>
          <p className="text-xs leading-none">
          {data.user.email}
          </p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup className='text-primary'>        
        <DropdownMenuItem className='flex items-center gap-2 cursor-pointer hover:text-primary hover:bg-primary/5'>
        <UserCog className='h-5 w-5' />
          Perfil
        </DropdownMenuItem>
        <DropdownMenuItem className='flex items-center gap-2 cursor-pointer hover:text-primary hover:bg-primary/5'>
        <Cog className='h-5 w-5' />
          Configurações
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={()=>signOut({ callbackUrl: '/login' })} className='text-primary flex items-center gap-2 cursor-pointer hover:text-primary hover:bg-primary/5'>
      <LogOut className='h-5 w-5' />
        Sair
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}