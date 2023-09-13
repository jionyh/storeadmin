'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export const Logo = () => {
  const params = useParams()
  return (
    <Link
      href={`/${params.tenant}`}
      className="flex flex-col items-center justify-center text-white"
    >
      <Image alt="" width={25} height={25} src="/assets/logo_branco.png" />
      <span className="text-sm leading-relaxed">STOREADMIN</span>
    </Link>
  )
}
