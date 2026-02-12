import CustomText from '@/components/custom/custom-text'
import { CustomButton } from '@/components/custom/CustomButton'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'
import Link from 'next/link'
import React from 'react'
import { CustomTitle } from './CustomTitle'

export interface TextImageDescriptionCardProps {
  logo?: string | MediaType | null
  title: string
  titlePos?: 'left' | 'center' | 'right'
  description: string
  imageUrl?: string | MediaType | null
  link?: {
    type?: 'reference' | 'custom' | null
    newTab?: boolean | null
    reference?: any
    url?: string | null
    label: string
    appearance?: 'default' | 'outline' | null
  } | null
  className?: string
  imagePosition?: 'left' | 'right'
  logoSize?: {
    width: string
    height: string
  }
}

export const TextImageDescriptionCard: React.FC<TextImageDescriptionCardProps> = ({
  logo,
  title,
  titlePos = 'center',
  description,
  imageUrl,
  link,
  className = '',
  imagePosition = 'left',
  logoSize = { width: 'w-[120px]', height: 'h-[60px]' },
}) => {
  // Split description into two parts
  const descriptionParts = description.split('\n\n')
  const firstPart = descriptionParts[0] || description
  const secondPart = descriptionParts[1] || ''

  const ImageSection = () => {
    const isCustomContainer = className?.includes('!container')
    const imageHeight = isCustomContainer ? 'h-auto' : 'h-full'
    const orderClass = isCustomContainer ? 'order-1' : ''

    return (
      <div
        className={`flex justify-center lg:justify-start relative w-full ${imageHeight} ${orderClass}`}
      >
        {imageUrl && (
          <div className="w-full h-full">
            <Media
              resource={imageUrl}
              className="w-full h-full"
              imgClassName="w-full h-full object-cover"
              size={
                typeof imageUrl !== 'string'
                  ? (imageUrl?.sizes?.small?.url ?? undefined)
                  : undefined
              }
            />
          </div>
        )}
      </div>
    )
  }

  const ContentSection = (titlePos?: 'left' | 'center' | 'right') => {
    const isCustomContainer = className?.includes('!container')
    const contentJustify = isCustomContainer ? 'justify-between' : 'justify-start'
    const logoHeight = isCustomContainer ? 'h-full' : 'h-full'
    const logoImageClass = isCustomContainer ? 'object-cover' : 'object-cover'
    const buttonMargin = isCustomContainer ? 'mt-32' : ''
    const orderClass = isCustomContainer ? 'order-2' : ''

    return (
      <div
        className={`w-full flex flex-col ${contentJustify} h-full ${orderClass} lg:items-start items-center text-center lg:text-left`}
      >
        <div className="flex flex-col w-full lg:w-auto items-center lg:items-start">
          {/* Company Logo - Always reserve space */}
          <div
            className={`${logoSize.width} ${logoSize.height} mb-20 lg:w-[120px] lg:h-[60px] w-[80px] h-[40px]`}
          >
            {logo && (
              <Media
                resource={logo}
                className="w-full h-full"
                imgClassName="w-full h-full object-contain"
                size={typeof logo !== 'string' ? (logo?.sizes?.small?.url ?? undefined) : undefined}
              />
            )}
          </div>

          {/* Title */}
          {title && (
            <div className="mb-20">
              <CustomTitle variant="h5" fontWeight={500} textAlign={titlePos} color="secondary">
                {title}
              </CustomTitle>
            </div>
          )}

          {/* First part of Description */}
          <div className="mb-20 text-center lg:text-left w-full">
            <CustomText
              variant="body"
              font="karla"
              fontWeight="bold"
              tracking="reduced"
              color="secondary"
              as="p"
            >
              {firstPart}
            </CustomText>
          </div>

          {/* Second part of Description */}
          {secondPart && (
            <div className={`${isCustomContainer ? 'mb-32' : 'mb-32'}  w-full`}>
              <CustomText
                variant="body"
                font="karla"
                fontWeight="bold"
                tracking="reduced"
                color="secondary"
                as="p"
                className="text-center lg:text-left"
              >
                {secondPart}
              </CustomText>
            </div>
          )}
        </div>
        {link && link.label && (
          <div className={`${buttonMargin} w-full block md:hidden`}>
            <Link href={link.url || '#'} target={link.newTab ? '_blank' : '_self'}>
              <CustomButton
                variant="outline"
                showArrow={true}
                arrowPosition="right"
                className=" !w-full"
              >
                {link.label}
              </CustomButton>
            </Link>
          </div>
        )}
        {/* Button with link */}
        {link && link.label && (
          <div className={`${buttonMargin} hidden md:block`}>
            <Link href={link.url || '#'} target={link.newTab ? '_blank' : '_self'}>
              <CustomButton variant="outline" showArrow={true} arrowPosition="right">
                {link.label}
              </CustomButton>
            </Link>
          </div>
        )}
      </div>
    )
  }

  // Use custom container class if provided, otherwise default
  const containerClass = className?.includes('!container')
    ? className.replace('!container', '').replace('!container', 'container-medium')
    : `container-medium ${className}`

  // Adjust gap and alignment based on container type
  const isCustomContainer = className?.includes('!container')
  const gridGap = isCustomContainer ? 'gap-32 lg:gap-48' : 'gap-32 lg:gap-48'
  const itemsAlignment = isCustomContainer ? 'items-center' : 'items-center lg:items-start'

  return (
    <div className={containerClass}>
      <div className={`grid grid-cols-1 lg:grid-cols-2 ${gridGap} ${itemsAlignment}`}>
        {imagePosition === 'left' ? (
          <>
            <ImageSection />
            {ContentSection(titlePos)}
          </>
        ) : (
          <>
            {ContentSection(titlePos)}
            <ImageSection />
          </>
        )}
      </div>
    </div>
  )
}
