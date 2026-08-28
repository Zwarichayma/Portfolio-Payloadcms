'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const menus = data?.menus || []

  return (
    <nav className="flex gap-3 items-center">
      {menus.map((menuItem, i) => {
        const menu = menuItem?.menu
        if (!menu) return null
        const { linkType, reference, href, title } = menu
        if (linkType === 'none' || !title) return null
        const linkProps = linkType === 'reference'
          ? { type: 'reference' as const, reference: reference as { relationTo: 'pages' | 'posts'; value: string }, label: title, appearance: 'link' as const, url: undefined }
          : { type: 'custom' as const, url: href || '#', label: title, appearance: 'link' as const, reference: undefined }
        return <CMSLink key={i} {...linkProps} />
      })}
      <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link>
    </nav>
  )
}
