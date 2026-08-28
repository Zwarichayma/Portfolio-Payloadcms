'use client'
import { CustomLink } from '@/components/custom/CustomLink'
import { Media } from '@/components/Media'
import Image from 'next/image'
import * as React from 'react'
import { cn } from '@/utilities/ui'
import CustomText from '../custom-text'
import { DropdownMenu } from './DropdownMenu'
import { useMenu } from './MenuContext'
import { MenuItemData } from './types'

export interface MenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  linkType?: 'none' | 'reference' | 'custom'
  href?: string | null
  reference?: any
  items?: MenuItemData[]
  actionLink?: {
    label: string
    href: string
  }
}

const MenuItem = React.forwardRef<HTMLDivElement, MenuItemProps>(
  (
    { className, title, linkType = 'none', href, reference, items = [], actionLink, ...props },
    ref,
  ) => {
    // Utilisation du contexte pour gérer l'état global des menus
    const { openMenu, setOpenMenu, headerRef } = useMenu()

    // Génération d'une clé unique pour ce menu basée sur le titre et un timestamp
    const uniqueMenuKey = React.useMemo(() => {
      return `${title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }, [title])

    const [dropdownPosition, setDropdownPosition] = React.useState<{ top: number } | null>(null)
    const menuItemRef = React.useRef<HTMLDivElement>(null)

    const isOpen = openMenu === uniqueMenuKey

    // Fermer le dropdown en cliquant en dehors
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (menuItemRef.current && !menuItemRef.current.contains(event.target as Node)) {
          setOpenMenu(null)
        }
      }

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [isOpen, setOpenMenu])

    // Si aucun titre, ne rien afficher
    const hasTitle = !!(title && String(title).trim())
    if (!hasTitle) return null

    // Transformation des items en format attendu par DropdownMenu
    const dropdownItems = items.map((item: MenuItemData) => ({
      label: item.label,
      icon: item.icon
  ? typeof item.icon === 'string'
    ? item.icon && (item.icon.startsWith('/') || item.icon.startsWith('http'))
      ? <Image src={item.icon} alt="menu icon" width={24} height={24} />
      : null
    : <Media resource={item.icon} className="w-6 h-6" />
  : undefined,
      href: item.href,
      type: item.type,
      variant: item.variant,
    }))

    // Fonction pour obtenir l'URL du lien du menu
    const getMenuLinkUrl = (): string | null => {
      if (linkType === 'custom' && href) {
        return href
      }
      if (linkType === 'reference' && reference) {
        // Pour les références, nous devons gérer la structure de Payload
        if (typeof reference === 'object') {
          // Si c'est un objet de référence avec value
          if ('value' in reference && reference.value) {
            const value = reference.value
            if (typeof value === 'object' && value && 'slug' in value) {
              return `/${value.slug}`
            }
          }
          // Si c'est directement un objet avec slug
          if ('slug' in reference) {
            return `/${reference.slug}`
          }
        }
        // Si c'est un ID string
        if (typeof reference === 'string') {
          return `/${reference}`
        }
      }
      return null
    }

    const menuLinkUrl = getMenuLinkUrl()

    // Si le menu a un lien direct, il n'y a pas de dropdown
    const hasDropdown = !menuLinkUrl

    const handleMenuClick = () => {
      if (menuLinkUrl || !hasDropdown || !items || items.length === 0) return // Ne pas ouvrir de dropdown si c'est un lien ou pas un menu avec items

      setOpenMenu(isOpen ? null : uniqueMenuKey)
      // Calculer la position du dropdown par rapport au header
      if (!isOpen && headerRef?.current && menuItemRef?.current) {
        const headerRect = headerRef.current.getBoundingClientRect()
        const menuItemRect = menuItemRef.current.getBoundingClientRect()
        const topPosition = menuItemRect.bottom - headerRect.top
        setDropdownPosition({ top: topPosition })
      }
    }

    const handleDropdownItemClick = () => setOpenMenu(null)

    // Si c'est un lien, envelopper tout dans le Link
    if (menuLinkUrl) {
      return (
        <CustomLink
          href={href}
          reference={reference}
          linkType={linkType}
          className={cn(
            'flex flex-row items-center px-24 py-16 gap-7 cursor-pointer h-[2.375rem] relative transition-all duration-200',
            // État hover : background gris 100
            'hover:bg-gray-100',
            className,
          )}
        >
          <CustomText
            variant="small"
            font="bricolage"
            fontWeight="medium"
            tracking="standard"
            color="secondary"
            className="whitespace-nowrap"
          >
            {title}
          </CustomText>
        </CustomLink>
      )
    }

    // Si c'est un dropdown
    return (
      <div
        ref={menuItemRef}
        className={cn(
          'flex flex-row items-center px-24 py-16 gap-7 cursor-pointer h-[2.375rem] relative transition-all duration-200',
          // État hover : background gris 100
          'hover:bg-gray-100',
          // État ouvert : maintenir le background si ouvert
          isOpen && items && items.length > 0 ? 'bg-gray-100' : '',
          className,
        )}
        onClick={handleMenuClick}
        {...props}
      >
        <CustomText
          variant="small"
          font="bricolage"
          fontWeight="medium"
          tracking="standard"
          color="secondary"
          className="whitespace-nowrap"
        >
          {title}
        </CustomText>
        {/* Afficher la flèche pour les dropdowns */}
        {items && items.length > 0 && (
          <Image
            src="/arrow-down.svg"
            alt="arrow down"
            width={8}
            height={5}
            className={cn(
              'flex-none order-1 flex-grow-0 transition-transform duration-200',
              // Rotation de 180° quand le menu est ouvert
              isOpen ? 'transform rotate-180' : '',
            )}
          />
        )}

        {/* Afficher le dropdown */}
        {items && items.length > 0 && (
          <DropdownMenu
            open={isOpen}
            items={dropdownItems}
            onItemClick={handleDropdownItemClick}
            actionLink={actionLink}
            headerRef={headerRef}
            dropdownPosition={dropdownPosition}
          />
        )}
      </div>
    )
  },
)
MenuItem.displayName = 'MenuItem'

export default MenuItem
