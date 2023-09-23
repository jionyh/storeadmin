'use client'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ClipboardList, Coins, FileCog, Menu, ShoppingCart, Wallet } from 'lucide-react'
import Link from 'next/link'

export const HamburgerMenu = ()=>{
  return(
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size='icon' className='hover:bg-transparent text-primary-foreground hover:text-primary-foreground'>
        <Menu className='h-14 w-14'/>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-fit min-w-[170px]" align="end" forceMount>
      <DropdownMenuGroup>
        <Link href='/compras'>
        <DropdownMenuItem className='flex items-center gap-2 cursor-pointer hover:bg-muted'>
        <ShoppingCart className='h-5 w-5' />
          Compras
        </DropdownMenuItem>
        </Link>
        <Link href='/vendas'>
        <DropdownMenuItem className='flex items-center gap-2 cursor-pointer hover:bg-muted'>
        <Coins className='h-5 w-5' />
          Vendas
        </DropdownMenuItem>
        </Link>
        <Link href='/despesas'>
        <DropdownMenuItem className='flex items-center gap-2 cursor-pointer hover:bg-muted'>
        <Wallet className='h-5 w-5' />
          Despesas
        </DropdownMenuItem>
        </Link>
      </DropdownMenuGroup>      
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <Link href='/configuracoes'>
        <DropdownMenuItem className='flex items-center gap-2 cursor-pointer hover:bg-muted'>
        <ClipboardList className='h-5 w-5' />
          Relatórios
        </DropdownMenuItem>
        </Link>
        <DropdownMenuItem className='flex items-center gap-2 cursor-pointer hover:bg-muted'>
        <FileCog className='h-5 w-5' />
          Configurações
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>  
  )
}