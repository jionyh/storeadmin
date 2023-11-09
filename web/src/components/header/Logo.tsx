/* eslint-disable @next/next/no-img-element */
'use client'
import Link from 'next/link'

export const Logo = () => {
  return (
    <Link href="/" className="flex flex-col items-center text-white">
      <img alt="" className="h-8 w-8" src="/assets/logo_branco.png" />
      <p className="text-sm leading-relaxed">STOREADMIN</p>
    </Link>
  )
}
