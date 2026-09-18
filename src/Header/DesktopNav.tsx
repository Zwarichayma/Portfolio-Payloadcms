'use client'

import CustomText from '@/components/custom/custom-text'
import { CustomButton } from '@/components/custom/CustomButton'
import { CustomLink } from '@/components/custom/CustomLink'
import type { Header as HeaderType } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { useTheme } from '@/providers/Theme'
import Image from 'next/image'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useRef, useState } from 'react'

interface DesktopNavProps {
  menus: HeaderType['menus']
}

export const DesktopNav: React.FC<DesktopNavProps> = ({ menus }) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const pathname = usePathname()

  if (!menus || menus.length === 0) return null

  return (
    <>
      {menus.map((menuItem, index) => {
        if (!menuItem || !('menu' in menuItem) || !menuItem.menu) return null

        const menu = menuItem.menu
        const hasTitle = !!(menu.title && String(menu.title).trim())
        const hasItems = Array.isArray(menu.items) && menu.items.length > 0
        const hasAction = !!(menu.actionLink && (menu.actionLink.href || menu.actionLink.label))

        if (!hasTitle && !hasItems && !hasAction) return null

        return (
          <DesktopMenuItem
            key={`${menu.title || 'menu'}-${index}`}
            title={menu.title}
            linkType={menu.linkType || 'none'}
            href={menu.href}
            reference={menu.reference}
            items={menu.items || []}
            actionLink={menu.actionLink}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            menuIndex={index}
            pathname={pathname}
          />
        )
      })}
    </>
  )
}

const DesktopMenuItem: React.FC<{
  title: string
  linkType?: 'none' | 'reference' | 'custom'
  href?: string | null
  reference?: unknown
  items?: NonNullable<HeaderType['menus']>[number]['menu']['items']
  actionLink?: NonNullable<HeaderType['menus']>[number]['menu']['actionLink']
  openMenu: string | null
  setOpenMenu: (menu: string | null) => void
  menuIndex: number
  pathname: string | null
}> = ({
  title,
  linkType = 'none',
  href,
  reference,
  items = [],
  actionLink,
  openMenu,
  setOpenMenu,
  menuIndex,
  pathname,
}) => {
  const menuItemRef = useRef<HTMLDivElement>(null)
  const uniqueMenuKey = `menu-${menuIndex}`
  const isOpen = openMenu === uniqueMenuKey
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const dropdownBg = isDark ? '#111827' : '#ffffff'
  const itemHoverBg = isDark ? '#374151' : '#f9fafb'
  const triggerActiveBg = isDark ? '#374151' : '#f3f4f6'
  const footerBg = isDark ? '#1f2937' : '#f3f4f6'
  const footerBorder = isDark ? '#374151' : '#e5e7eb'
  const itemTextColor = isDark ? '#e5e7eb' : '#191d1e'
  const arrowFilter = isDark ? 'invert(1)' : undefined
  const dropdownBorder = isDark ? 'rgba(139,92,246,0.25)' : 'rgba(139,92,246,0.15)'

  // Gestion du clic en dehors
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

  const hasTitle = !!(title && String(title).trim())
  if (!hasTitle) return null

  // Get menu link URL
  const getMenuLinkUrl = (): string | null => {
    if (linkType === 'custom' && href) return href
    if (linkType === 'reference' && reference) {
      if (typeof reference === 'object') {
        if ('value' in reference && reference.value) {
          const value = reference.value
          if (typeof value === 'object' && value && 'slug' in value) {
            return `/${value.slug}`
          }
        }
        if ('slug' in reference) return `/${reference.slug}`
      }
      if (typeof reference === 'string') return `/${reference}`
    }
    return null
  }

  const menuLinkUrl = getMenuLinkUrl()
  const hasDropdown = !menuLinkUrl

  // Transform items for dropdown
  const dropdownItems = (items || []).map(
    (
      item: NonNullable<HeaderType['menus']>[number]['menu']['items'] extends
        | (infer T)[]
        | null
        | undefined
        ? T
        : never,
    ) => ({
      label: item.label,
      icon: item.icon ? (
        typeof item.icon === 'string' ? (
          item.icon && (item.icon.startsWith('/') || item.icon.startsWith('http')) ? (
            <Image src={item.icon} alt="menu icon" width={24} height={24} />
          ) : null
        ) : // Handle Payload media object
        item.icon.url ? (
          <Image src={item.icon.url} alt="menu icon" width={24} height={24} />
        ) : null
      ) : undefined,
      href: item.href || '#',
      type: item.type || 'link',
    }),
  )

  // Item actif : lien direct correspondant, ou l'un des items du dropdown
  const isActive = menuLinkUrl
    ? menuLinkUrl === pathname
    : dropdownItems.some((item) => item.href && item.href === pathname)

  // Calcul dynamique des colonnes : 3 items maximum par colonne
  const columnsCount = Math.ceil(dropdownItems.length / 3)
  const columns: Array<
    Array<{
      label: string
      icon?: React.ReactNode
      href: string
      type: 'link' | 'button'
    }>
  > = []

  for (let i = 0; i < columnsCount; i++) {
    const startIndex = i * 3
    const endIndex = Math.min(startIndex + 3, dropdownItems.length)
    columns.push(dropdownItems.slice(startIndex, endIndex))
  }

  const handleMenuClick = () => {
    if (menuLinkUrl || !hasDropdown || !items || items.length === 0) return
    setOpenMenu(isOpen ? null : uniqueMenuKey)
  }

  const handleDropdownItemClick = () => setOpenMenu(null)

  // Direct link
  if (menuLinkUrl) {
    return (
      <CustomLink
        href={href}
        reference={reference}
        linkType={(linkType as 'none' | 'reference' | 'custom') || 'none'}
        newTab={false}
        className={cn(
          'group flex flex-row items-center px-24 py-16 gap-7 cursor-pointer h-[2.375rem] relative rounded-lg transition-all duration-200',
          '',
        )}
      >
        <span className="relative inline-block">
          <CustomText
            as="span"
            variant="small"
            font="bricolage"
            fontWeight="medium"
            tracking="standard"
            color="secondary"
            customColor={itemTextColor}
            className="whitespace-nowrap dark:text-gray-200"
          >
            {title}
          </CustomText>
          <span
            className="absolute left-0 -bottom-1 h-[2px] rounded-full bg-[#7c3aed] transition-all duration-300"
            style={{ width: isActive ? '100%' : '0%' }}
          />
        </span>
      </CustomLink>
    )
  }

  // Dropdown
  return (
    <div
      ref={menuItemRef}
      className={cn(
        'group flex flex-row items-center px-24 py-16 gap-7 cursor-pointer h-[2.375rem] relative rounded-lg transition-all duration-200',
        '',
        isOpen && items && items.length > 0 ? 'bg-gray-100 dark:bg-gray-700' : '',
      )}
      style={isOpen ? { backgroundColor: triggerActiveBg } : undefined}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = triggerActiveBg
      }}
      onMouseLeave={(e) => {
        if (!isOpen) e.currentTarget.style.backgroundColor = 'transparent'
      }}
      onClick={handleMenuClick}
    >
      <span className="relative inline-block">
        <CustomText
          as="span"
          variant="small"
          font="bricolage"
          fontWeight="medium"
          tracking="standard"
          color="secondary"
          customColor={itemTextColor}
          className="whitespace-nowrap dark:text-gray-200"
        >
          {title}
        </CustomText>
        <span
          className="absolute left-0 -bottom-1 h-[2px] rounded-full bg-[#7c3aed] transition-all duration-300"
          style={{ width: isActive ? '100%' : '0%' }}
        />
      </span>
      {items && items.length > 0 && (
        <>
          <Image
            src="/arrow-down.svg"
            alt="arrow down"
            width={8}
            height={5}
            style={{ filter: arrowFilter }}
            className={cn(
              'flex-none order-1 flex-grow-0 transition-transform duration-200 dark:invert',
              isOpen ? 'transform rotate-180' : '',
            )}
          />
          {isOpen && (
            <div
              className="absolute left-0 top-[61px] z-50 inline-flex flex-col h-auto overflow-hidden rounded-xl border shadow-[0px_20px_44px_rgba(0,0,0,0.12)] animate-in fade-in-0 slide-in-from-top-1 duration-150"
              style={{ backgroundColor: dropdownBg, borderColor: dropdownBorder }}
            >
              {/* Section des items avec colonnes dynamiques et bouton optionnel */}
              <div className="p-24">
                {/* Items en colonnes */}
                <div className="flex gap-32 justify-center">
                  {columns.map((column, colIndex) => (
                    <div key={colIndex} className="flex flex-col gap-7">
                      {column.map(
                        (
                          item: {
                            label: string
                            icon?: React.ReactNode
                            href: string
                            type: 'link' | 'button'
                          },
                          itemIndex: number,
                        ) => {
                          // Si c'est un item de type button
                          if (item.type === 'button') {
                            return (
                              <div
                                key={`${colIndex}-${itemIndex}`}
                                className="flex justify-start mt-2"
                              >
                                <NextLink href={item.href || '#'} className="w-full">
                                  <CustomButton variant="primary">{item.label}</CustomButton>
                                </NextLink>
                              </div>
                            )
                          }

                          // Item normal avec lien optionnel
                          const ItemContent = (
                            <div
                              onClick={handleDropdownItemClick}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = itemHoverBg
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent'
                              }}
                              className="flex items-center justify-start gap-7 px-[0.8125rem] py-[0.4375rem] pl-[0.375rem] flex-shrink-0 cursor-pointer w-full whitespace-nowrap overflow-hidden text-ellipsis h-[2.375rem] min-w-[250px] hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                            >
                              {item.icon && (
                                <span className="w-6 h-6 flex-shrink-0">{item.icon}</span>
                              )}
                              <CustomText
                                variant="small"
                                font="bricolage"
                                fontWeight="medium"
                                tracking="standard"
                                color="secondary"
                                customColor={itemTextColor}
                                className="dark:text-gray-200"
                              >
                                {item.label}
                              </CustomText>
                            </div>
                          )

                          // Si l'item a un href, on l'entoure d'un lien Next.js
                          if (item.href) {
                            return (
                              <NextLink key={`${colIndex}-${itemIndex}`} href={item.href}>
                                {ItemContent}
                              </NextLink>
                            )
                          }

                          return <div key={`${colIndex}-${itemIndex}`}>{ItemContent}</div>
                        },
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Section du footer avec lien d'action - affiché seulement si actionLink est fourni et label non vide */}
              {actionLink &&
                actionLink.href &&
                actionLink.label &&
                actionLink.label.trim() !== '' && (
                  <div
                    className="flex flex-col items-center justify-center p-24 border-t border-gray-100 bg-gray-100 dark:border-gray-700 dark:bg-gray-800"
                    style={{ backgroundColor: footerBg, borderTopColor: footerBorder }}
                  >
                    <NextLink
                      href={actionLink.href}
                      onClick={handleDropdownItemClick}
                      className="flex items-center justify-center gap-7"
                    >
                      <CustomText
                        variant="small"
                        font="bricolage"
                        fontWeight="medium"
                        tracking="standard"
                        color="primary"
                        textAlign="center"
                      >
                        {actionLink.label}
                      </CustomText>
                      <Image
                        src="/arrow-left.svg"
                        alt="arrow"
                        width={13.33}
                        height={10.02}
                        style={{ filter: arrowFilter }}
                        className="text-primary dark:invert"
                      />
                    </NextLink>
                  </div>
                )}
            </div>
          )}
        </>
      )}
    </div>
  )
}
