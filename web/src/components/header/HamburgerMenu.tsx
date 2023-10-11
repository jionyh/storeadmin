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
import {
  ClipboardList,
  Coins,
  FileCog,
  Menu,
  ShoppingCart,
  Wallet,
} from 'lucide-react'
import Link from 'next/link'

export const HamburgerMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-transparent hover:text-white"
        >
          <Menu className="h-14 w-14" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-fit min-w-[170px] text-primary"
        align="end"
        forceMount
      >
        <DropdownMenuGroup>
          <Link href="/compras">
            <DropdownMenuItem className="flex cursor-pointer items-center gap-2 hover:bg-primary/5 hover:text-primary">
              <ShoppingCart className="h-5 w-5" />
              Compras
            </DropdownMenuItem>
          </Link>
          <Link href="/vendas">
            <DropdownMenuItem className="flex cursor-pointer items-center gap-2 hover:bg-primary/5 hover:text-primary">
              <Coins className="h-5 w-5" />
              Vendas
            </DropdownMenuItem>
          </Link>
          <Link href="/despesas">
            <DropdownMenuItem className="flex cursor-pointer items-center gap-2 hover:bg-primary/5 hover:text-primary">
              <Wallet className="h-5 w-5" />
              Despesas
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/relatorios">
            <DropdownMenuItem className="flex cursor-pointer items-center gap-2 hover:bg-primary/5 hover:text-primary">
              <ClipboardList className="h-5 w-5" />
              Relatórios
            </DropdownMenuItem>
          </Link>
          <Link href="/cadastros">
            <DropdownMenuItem className="flex cursor-pointer items-center gap-2 hover:bg-primary/5 hover:text-primary">
              <FileCog className="h-5 w-5" />
              Cadastros
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
