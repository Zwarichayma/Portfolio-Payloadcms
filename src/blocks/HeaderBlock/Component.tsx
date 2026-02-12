'use server'
import { CustomButton } from '@/components/custom/CustomButton'
import { CustomLink } from '@/components/custom/CustomLink'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import type { Page } from '@/payload-types'
import { Link } from '@/types/link'
import Image from 'next/image'
import React from 'react'
import { DesktopNav } from '../../Header/DesktopNav'
import { MobileMenuButton } from '../../Header/MobileMenuButton'
import { getGlobalHeader } from './getGlobalHeader'
import { HeaderWrapper } from './HeaderWrapper'

// Extract HeaderBlock type from Page layout
type LayoutBlock = NonNullable<Page['layout']>[number]
type HeaderBlockFromPayload = Extract<LayoutBlock, { blockType: 'headerBlock' }>

export type HeaderBlockProps = HeaderBlockFromPayload

export const HeaderBlock: React.FC<HeaderBlockProps> = async (props) => {
  const {
    overrideLogo,
    overrideMenus,
    overrideCtaButton,
    overrideConsultantButton,
    logo,
    logoLink,
    customMenus,
    ctaButton,
    consultantButton,
    anchorId,
  } = props
  // Fetch global header data
  const globalHeader = await getGlobalHeader()

  // Compute all logic on server side
  const logoToUse = overrideLogo ? logo : globalHeader?.logo
  const logoLinkToUse = overrideLogo ? logoLink : globalHeader?.logoLink
  const menusToUse = overrideMenus ? customMenus : globalHeader?.menus || []
  const ctaButtonToUse = overrideCtaButton ? ctaButton : globalHeader?.ctaButton
  const consultantButtonToUse = overrideConsultantButton
    ? consultantButton
    : globalHeader?.consultantButton

  // Validation checks
  const hasValidMenus = menusToUse && menusToUse.length > 0
  const hasValidCtaButton =
    ctaButtonToUse &&
    ctaButtonToUse.label &&
    typeof ctaButtonToUse.label === 'string' &&
    ctaButtonToUse.label.trim() !== ''
  const hasValidConsultantButton =
    consultantButtonToUse &&
    consultantButtonToUse.label &&
    typeof consultantButtonToUse.label === 'string' &&
    consultantButtonToUse.label.trim() !== ''

  const shouldShowMobileMenu = hasValidMenus || hasValidCtaButton || hasValidConsultantButton
  const shouldShowHeader =
    !!logoToUse ||
    hasValidMenus ||
    hasValidCtaButton ||
    hasValidConsultantButton ||
    shouldShowMobileMenu

  if (!shouldShowHeader) {
    return null
  }
  return (
    <>
      <section id={anchorId || undefined}>
        <HeaderWrapper>
          <header className="container lg:[--has-sidebar:1] lg:w-full lg:px-24 md:px-40 py-16 flex items-center justify-between h-full">
            {/* Logo et Navigation */}
            <div className="flex items-center gap-32 min-w-0">
              {/* Logo - Server Component */}
              <div className="flex-shrink-0">
                <CustomLink
                  href={
                    typeof logoLinkToUse === 'object' && logoLinkToUse?.url
                      ? logoLinkToUse.url
                      : '#'
                  }
                  reference={
                    typeof logoLinkToUse === 'object' && 'reference' in logoLinkToUse
                      ? logoLinkToUse.reference
                      : undefined
                  }
                  linkType={
                    typeof logoLinkToUse === 'object' && 'type' in logoLinkToUse
                      ? (logoLinkToUse.type as 'custom' | 'reference')
                      : 'custom'
                  }
                  newTab={
                    typeof logoLinkToUse === 'object' && (logoLinkToUse as Link)?.newTab
                      ? true
                      : false
                  }
                >
                  {typeof logoToUse === 'object' &&
                  logoToUse &&
                  'url' in logoToUse &&
                  logoToUse.url ? (
                    <Image
                      src={logoToUse.url}
                      alt="Site Logo"
                      width={155}
                      height={40}
                      className="w-[125px] md:w-[155px] max-h-[40px] object-cover overflow-hidden"
                    />
                  ) : null}
                </CustomLink>
              </div>

              {/* Navigation Desktop - Server Component */}
              {hasValidMenus && (
                <nav className="hidden lg:flex items-center gap-32">
                  <DesktopNav menus={menusToUse} />
                </nav>
              )}
            </div>

            {/* Actions Desktop & Mobile */}
            <div className="flex items-center gap-4 ml-auto lg:ml-0">
              {/* Theme Toggle Button */}
              <ThemeToggle className="flex-shrink-0" />

              {/* CTA Button Desktop - Server Component */}
              {hasValidCtaButton && (
                <div className="hidden lg:block">
                  <CustomLink
                    href={ctaButtonToUse.buttonLink?.url}
                    reference={ctaButtonToUse.buttonLink?.reference}
                    linkType={ctaButtonToUse.buttonLink?.type || 'custom'}
                    newTab={(ctaButtonToUse.buttonLink as any)?.newTab || false}
                  >
                    <CustomButton variant="primary" className="">
                      {ctaButtonToUse.label}
                    </CustomButton>
                  </CustomLink>
                </div>
              )}

              {/* Mobile Section */}
              <div className="lg:hidden flex items-center gap-2">
                {/* Hamburger Button - Client Component uniquement */}
                {shouldShowMobileMenu && (
                  <MobileMenuButton
                    menus={menusToUse}
                    ctaButton={ctaButtonToUse}
                    consultantButton={consultantButtonToUse}
                  />
                )}
              </div>
            </div>
          </header>
        </HeaderWrapper>

        {/* Spacer for fixed header */}
        <div className="h-[72px]" />
       
      </section>
    </>
  )
}
