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
import { signOut } from 'next-auth/react'
import { Cog, LogOut, UserCog } from 'lucide-react'

export const UserMenu = ()=>{
  return(
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
    <Button variant="ghost" className="relative h-9 w-9 rounded-full">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="@shadcn" />
          <AvatarFallback className='text-muted-foreground'>JH</AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-fit min-w-[170px]" align="end" forceMount>
      <DropdownMenuLabel className="font-normal">
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-medium leading-none">Jiony Henrique dos Santos</p>
          <p className="text-xs leading-none text-muted-foreground">
            jiony@live.com
          </p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>        
        <DropdownMenuItem className='flex items-center gap-2 cursor-pointer hover:bg-muted'>
        <UserCog className='h-5 w-5' />
          Perfil
        </DropdownMenuItem>
        <DropdownMenuItem className='flex items-center gap-2 cursor-pointer hover:bg-muted'>
        <Cog className='h-5 w-5' />
          Configurações
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={()=>signOut({ callbackUrl: '/login' })} className='flex items-center gap-2 cursor-pointer hover:bg-muted'>
      <LogOut className='h-5 w-5' />
        Sair
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}