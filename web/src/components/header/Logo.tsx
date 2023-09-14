/* eslint-disable @next/next/no-img-element */
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export const Logo = () => {
  const params = useParams()
  return (
    <Link
      href="/"
      className="flex flex-col items-center justify-center text-white"
    >
      <img alt="" className="h-8 w-8" src="/assets/logo_branco.png" />
      <span className="text-sm leading-relaxed">STOREADMIN</span>
    </Link>
  )
}
