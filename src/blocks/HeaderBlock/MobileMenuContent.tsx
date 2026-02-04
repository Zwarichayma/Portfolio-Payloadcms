'use client'

import CustomText from '@/components/custom/custom-text'
import { CustomButton } from '@/components/custom/CustomButton'
import { CustomLink } from '@/components/custom/CustomLink'
import { Media } from '@/components/Media'
import type { Header as HeaderType } from '@/payload-types'
import { Link } from '@/types/link'
import { cn } from '@/utilities/ui'
import Image from 'next/image'
import React, { useMemo, useState } from 'react'

type MenusType = HeaderType['menus']
type CtaButtonType = HeaderType['ctaButton']
type ConsultantButtonType = HeaderType['consultantButton']

interface MobileMenuContentProps {
  menus: MenusType
  ctaButton?: CtaButtonType | null
  consultantButton?: ConsultantButtonType | null
  onClose: () => void
  isOpen: boolean
}

export const MobileMenuContent: React.FC<MobileMenuContentProps> = ({
  menus,
  ctaButton,
  consultantButton,
  onClose,
  isOpen,
}) => {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null)

  const toggleMenu = (index: number) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index)
  }

  // Mémoriser les items du menu pour éviter les re-renders
  const menuItems = useMemo(() => {
    if (!menus || menus.length === 0) return []

    return menus
      .map((menuItem, index) => {
        if (!menuItem || !('menu' in menuItem) || !menuItem.menu) return null

        const menu = menuItem.menu
        const isDirectLink = menu.linkType && menu.linkType !== 'none'
        const hasItems = menu.items && menu.items.length > 0
        const items = menu.items || []

        return {
          index,
          title: menu.title,
          isDirectLink,
          hasItems,
          items,
          href: menu.href,
          reference: menu.reference,
          linkType: menu.linkType,
        }
      })
      .filter(Boolean)
  }, [menus])

  return (
    <>
      <div className="h-[1px] shadow-[0px_1px_0px_0px_#BFC6CC80]" />
      <div className="container p-24">
        {menuItems.map((menuData) => {
          if (!menuData) return null

          const { index, title, isDirectLink, hasItems, items, href, reference, linkType } =
            menuData

          return (
            <div key={`menu-${index}`} className="border-b border-gray-200">
              {isDirectLink ? (
                <CustomLink
                  href={href}
                  reference={reference}
                  linkType={linkType || 'custom'}
                  newTab={(menuData as Link)?.newTab || false}
                  onClick={onClose}
                  className="w-full flex items-center justify-between py-24"
                >
                  <CustomText
                    variant="h6"
                    font="bricolage"
                    fontWeight="medium"
                    tracking="standard"
                    color="secondary"
                    className="leading-[100%]"
                  >
                    {title}
                  </CustomText>
                </CustomLink>
              ) : (
                <>
                  <button
                    onClick={() => toggleMenu(index)}
                    className="w-full flex items-center justify-between py-24"
                  >
                    <CustomText
                      variant="h6"
                      font="bricolage"
                      fontWeight="medium"
                      tracking="standard"
                      color="secondary"
                      className="leading-[100%]"
                    >
                      {title}
                    </CustomText>
                    {hasItems && (
                      <Image
                        src="/arrow-down.svg"
                        alt="arrow down"
                        width={14}
                        height={8}
                        className={cn(
                          'flex-none transition-transform duration-300',
                          openMenuIndex === index ? 'transform rotate-180' : '',
                        )}
                        priority
                      />
                    )}
                  </button>

                  {/* Submenu items - toujours monté, juste masqué */}
                  {!isDirectLink && hasItems && (
                    <div
                      className={cn(
                        'overflow-hidden transition-all duration-300',
                        openMenuIndex === index
                          ? 'max-h-[1000px] opacity-100 pb-4'
                          : 'max-h-0 opacity-0',
                      )}
                    >
                      <div className="space-y-2">
                        {items.map((item, itemIndex) => {
                          const ItemContent = (
                            <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                              {item.icon && (
                                <span className="w-6 h-6 flex-shrink-0">
                                  {typeof item.icon === 'string' ? (
                                    item.icon &&
                                    (item.icon.startsWith('/') || item.icon.startsWith('http')) ? (
                                      <Image
                                        src={item.icon}
                                        alt=""
                                        width={24}
                                        height={24}
                                        priority
                                      />
                                    ) : null
                                  ) : (
                                    <Media resource={item.icon} className="w-6 h-6" priority />
                                  )}
                                </span>
                              )}
                              <CustomText
                                variant="small"
                                font="bricolage"
                                fontWeight="medium"
                                tracking="standard"
                                color="secondary"
                              >
                                {item.label}
                              </CustomText>
                            </div>
                          )
                          if (item.type === 'button') {
                            return (
                              <CustomLink
                                key={itemIndex}
                                href={item.href}
                                reference={item.reference}
                                linkType={item.linkType || 'custom'}
                                className="w-full block py-2"
                              >
                                <CustomButton
                                  variant="primary"
                                  className="w-full"
                                  onClick={onClose}
                                  showArrow={false}
                                >
                                  {item.label}
                                </CustomButton>
                              </CustomLink>
                            )
                          }

                          return (
                            <CustomLink
                              key={`item-${index}-${itemIndex}`}
                              href={item.href}
                              reference={item.reference}
                              linkType={item.linkType || 'custom'}
                              onClick={onClose}
                              className="block"
                            >
                              {ItemContent}
                            </CustomLink>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )
        })}
        {/* Boutons en bas du menu mobile */}
        <div
          className="pt-6 space-y-3 !border-t !border-gray-200"
          style={{ borderTop: '1px solid #BFC6CC80 !important' }}
        >
          {/* Bouton Rendez-vous */}
          {ctaButton &&
            ctaButton.label &&
            typeof ctaButton.label === 'string' &&
            ctaButton.label.trim() !== '' && (
              <div className="w-full">
                <CustomLink
                  href={ctaButton.buttonLink?.url}
                  reference={ctaButton.buttonLink?.reference}
                  linkType={ctaButton.buttonLink?.type || 'custom'}
                  newTab={(ctaButton.buttonLink as any)?.newTab || false}
                  onClick={onClose}
                >
                  <CustomButton variant="primary" className="!w-full">
                    {ctaButton.label}
                  </CustomButton>
                </CustomLink>
              </div>
            )}

          {/* Bouton Trouver mon consultant */}
          {consultantButton &&
            consultantButton.label &&
            typeof consultantButton.label === 'string' &&
            consultantButton.label.trim() !== '' && (
              <div className="w-full">
                <CustomLink
                  href={consultantButton.href}
                  reference={consultantButton.reference}
                  linkType={consultantButton.linkType || 'custom'}
                  newTab={(consultantButton as any)?.newTab || false}
                  onClick={onClose}
                >
                  <CustomButton variant="secondary-filled" className="w-full">
                    {consultantButton.label}
                  </CustomButton>
                </CustomLink>
              </div>
            )}
        </div>
      </div>
    </>
  )
}
