import type { Media as MediaType } from '@/payload-types'

export interface MenuItemData {
  label: string
  icon: string | MediaType | null | undefined
  href: string
  type?: 'link' | 'button'
  variant?: 'primary' | 'secondary' | 'outline'
}

export interface MenuConfig {
  title: string
  linkType?: 'none' | 'reference' | 'custom'
  href?: string | null
  reference?: any
  items: MenuItemData[]
  actionLink?: {
    label: string
    href: string
  }
}

export interface MenuData {
  menus: {
    [key: string]: MenuConfig
  }
}
