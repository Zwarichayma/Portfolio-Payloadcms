'use client'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'
import { cn } from '@/utilities/ui'
import CustomText from '../custom-text'
import { CustomButton } from '../CustomButton'

export interface DropdownMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
}

export const DropdownMenuItem = React.forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  ({ className, icon, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-start gap-7 px-[0.8125rem] py-[0.4375rem] pl-[0.375rem] flex-shrink-0 cursor-pointer w-full whitespace-nowrap overflow-hidden text-ellipsis',
        className,
      )}
      {...props}
    >
      {icon && <span className="w-6 h-6 flex-shrink-0">{icon}</span>}
      <CustomText
        variant="small"
        font="bricolage"
        fontWeight="medium"
        tracking="standard"
        color="secondary"
        className=""
      >
        {children}
      </CustomText>
    </div>
  ),
)
DropdownMenuItem.displayName = 'DropdownMenuItem'

export interface DropdownMenuItem {
  label: string
  icon?: React.ReactNode
  href?: string
  type?: 'button' | 'link'
  variant?: 'primary' | 'secondary' | 'outline'
}

export interface DropdownMenuProps {
  open: boolean
  items: DropdownMenuItem[]
  onItemClick: () => void
  actionLink?: { label: string; href: string }
  button?: { label: string; variant?: 'primary' | 'secondary' | 'outline'; onClick?: () => void }
  headerRef?: React.RefObject<HTMLElement | null>
  dropdownPosition?: { top: number } | null
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  open,
  items,
  onItemClick,
  actionLink,
  button,
  headerRef,
  dropdownPosition,
}) => {
  if (!open) return null

  // Filtrer les items qui ont un label vide
  const filteredItems = items.filter((item) => item.label && item.label.trim() !== '')

  // Calcul dynamique des colonnes : 3 items maximum par colonne
  const columnsCount = Math.ceil(filteredItems.length / 3)
  const columns: (typeof filteredItems)[] = []

  for (let i = 0; i < columnsCount; i++) {
    const startIndex = i * 3
    const endIndex = Math.min(startIndex + 3, filteredItems.length)
    columns.push(filteredItems.slice(startIndex, endIndex))
  }

  const dropdownStyle: React.CSSProperties = {
    ...(dropdownPosition && { top: `${dropdownPosition.top}px` }),
  }

  return (
    <div
      className="absolute left-0 z-50  bg-white inline-flex flex-col h-auto shadow-[0px_321px_128px_rgba(0,0,0,0.01),0px_181px_108px_rgba(0,0,0,0.05),0px_80px_80px_rgba(0,0,0,0.09),0px_20px_44px_rgba(0,0,0,0.1)]"
      style={dropdownStyle}
    >
      {/* Section des items avec colonnes dynamiques et bouton optionnel */}
      <div className=" p-24">
        {/* Items en colonnes */}
        <div className="flex gap-32 justify-center">
          {columns.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-7">
              {column.map((item, itemIndex) => {
                // Si c'est un item de type button
                if (item.type === 'button') {
                  return (
                    <div key={`${colIndex}-${itemIndex}`} className="flex justify-start mt-2">
                      <Link href={item.href || '#'} className="w-full">
                        {item.variant === 'primary' ? (
                          <CustomButton variant="primary" className="w-full">
                            {item.label}
                          </CustomButton>
                        ) : (
                          <CustomButton
                            variant={item.variant}
                            onClick={onItemClick}
                            showArrow={true}
                            arrowPosition="right"
                            animated={true}
                            className="w-full inline-flex h-[3.1875rem] px-5 py-[0.625rem] justify-center items-center gap-7 flex-shrink-0 bg-primary hover:bg-primary-hover hover:border hover:border-[rgba(13,76,196,0.25)] hover:shadow-[0px_1px_2px_rgba(0,0,0,0.1)] transition-all duration-300"
                          >
                            {item.label}
                          </CustomButton>
                        )}
                      </Link>
                    </div>
                  )
                }

                // Item normal avec lien optionnel
                const ItemContent = (
                  <DropdownMenuItem
                    icon={item.icon}
                    onClick={onItemClick}
                    className="h-[2.375rem] min-w-[250px]"
                  >
                    {/* Using CustomText directly in DropdownMenuItem */}
                    {item.label}
                  </DropdownMenuItem>
                )

                // Si l'item a un href, on l'entoure d'un lien Next.js
                if (item.href) {
                  return (
                    <Link key={`${colIndex}-${itemIndex}`} href={item.href}>
                      {ItemContent}
                    </Link>
                  )
                }

                return <div key={`${colIndex}-${itemIndex}`}>{ItemContent}</div>
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Section du footer avec lien d'action - affiché seulement si actionLink est fourni et label non vide */}
      {actionLink && actionLink.href && actionLink.label && actionLink.label.trim() !== '' && (
        <div className="flex flex-col items-center justify-center p-24  border-t border-gray-100 bg-gray-100">
          <Link
            href={actionLink.href}
            onClick={onItemClick}
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
              className="text-primary"
            />
          </Link>
        </div>
      )}
    </div>
  )
}
