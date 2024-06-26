'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ButtonVariants } from './ui/button'
import { usePathname } from 'next/navigation'

type Props = {
  items: {
    href: string
    title: string
  }[]
}

export const NavConfigButtons = ({ items }: Props) => {
  const pathname = usePathname()
  return (
    <nav className="my-2 flex flex-wrap items-center justify-center">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            ButtonVariants({ variant: 'ghost', size: 'sm' }),
            pathname.startsWith(item.href)
              ? 'border border-primary hover:bg-primary/5'
              : 'hover:bg-transparent hover:underline',
            'justify-start',
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
