'use client'

import CustomText from '@/components/custom/custom-text'
import { CustomLink } from '@/components/custom/CustomLink'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import Image from 'next/image'
import React, { useRef, useState } from 'react'

interface DesktopMenuItemProps {
  title: string
  linkType?: 'none' | 'reference' | 'custom'
  href?: string | null
  reference?: any
  items?: Array<{
    label: string
    icon?: any
    href?: string
    reference?: any
    linkType?: 'none' | 'reference' | 'custom'
    type?: 'link' | 'button'
  }>
  actionLink?: {
    label?: string
    href?: string
  }
}

export const DesktopMenuItem: React.FC<DesktopMenuItemProps> = ({
  title,
  linkType = 'none',
  href,
  reference,
  items = [],
  actionLink,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuItemRef = useRef<HTMLDivElement>(null)

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
  const hasDropdown = !menuLinkUrl && items && items.length > 0

  const handleMenuClick = () => {
    if (menuLinkUrl || !hasDropdown) return
    setIsOpen(!isOpen)
  }

  const handleItemClick = () => {
    setIsOpen(false)
  }

  // Gestion du clic en dehors
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuItemRef.current && !menuItemRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Direct link - pas de dropdown
  if (menuLinkUrl) {
    return (
      <CustomLink
        href={href}
        reference={reference}
        linkType={linkType}
        newTab={false}
        className={cn(
          'flex flex-row items-center px-24 py-16 gap-7 cursor-pointer h-[2.375rem] relative transition-all duration-200',
          'hover:bg-gray-100',
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

  // Dropdown menu
  return (
    <div
      ref={menuItemRef}
      className={cn(
        'flex flex-row items-center px-24 py-16 gap-7 cursor-pointer h-[2.375rem] relative transition-all duration-200',
        'hover:bg-gray-100',
        isOpen ? 'bg-gray-100' : '',
      )}
      onClick={handleMenuClick}
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

      {hasDropdown && (
        <>
          <Image
            src="/arrow-down.svg"
            alt="arrow down"
            width={8}
            height={5}
            className={cn(
              'flex-none order-1 flex-grow-0 transition-transform duration-200',
              isOpen ? 'transform rotate-180' : '',
            )}
          />

          {/* Dropdown content */}
          {isOpen && (
            <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg min-w-[200px] z-50">
              <div className="py-2">
                {items.map((item, index) => {
                  const itemIcon = item.icon ? (
                    typeof item.icon === 'string' ? (
                      item.icon && (item.icon.startsWith('/') || item.icon.startsWith('http')) ? (
                        <Image src={item.icon} alt="menu icon" width={24} height={24} />
                      ) : null
                    ) : (
                      <Media resource={item.icon} className="w-6 h-6" />
                    )
                  ) : undefined

                  return (
                    <CustomLink
                      key={index}
                      href={item.href || '#'}
                      reference={item.reference}
                      linkType={item.linkType || 'custom'}
                      newTab={false}
                      onClick={handleItemClick}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      {itemIcon && <span className="w-6 h-6 flex-shrink-0">{itemIcon}</span>}
                      <span className="text-sm text-gray-700">{item.label}</span>
                    </CustomLink>
                  )
                })}

                {actionLink && actionLink.label && actionLink.href && (
                  <div className="border-t mt-2 pt-2 px-2">
                    <CustomLink
                      href={actionLink.href}
                      onClick={handleItemClick}
                      className="block px-4 py-3 bg-primary text-white rounded text-center hover:bg-primary-dark transition-colors text-sm"
                    >
                      {actionLink.label}
                    </CustomLink>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
