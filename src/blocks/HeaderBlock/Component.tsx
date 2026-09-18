'use server'
import { CustomButton } from '@/components/custom/CustomButton'
import { CustomLink } from '@/components/custom/CustomLink'
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
    showLogo,
    useInternalLogo,
    overrideLogo,
    overrideMenus,
    overrideCtaButton,
    logo,
    logoLink,
    customMenus,
    ctaButton,
  } = props
  const globalHeader = await getGlobalHeader()

  const logoToUse = overrideLogo ? logo : globalHeader?.logo
  const hasLogo =
    showLogo !== false &&
    (useInternalLogo ||
      (typeof logoToUse === 'object' &&
        logoToUse !== null &&
        'url' in logoToUse &&
        Boolean(logoToUse.url)))
  const logoLinkToUse = overrideLogo ? logoLink : globalHeader?.logoLink
  const menusToUse = overrideMenus ? customMenus : globalHeader?.menus || []
  const ctaButtonToUse = overrideCtaButton ? ctaButton : globalHeader?.ctaButton

  const hasValidMenus = menusToUse && menusToUse.length > 0
  const hasValidCtaButton =
    ctaButtonToUse &&
    ctaButtonToUse.label &&
    typeof ctaButtonToUse.label === 'string' &&
    ctaButtonToUse.label.trim() !== ''

  const shouldShowMobileMenu = hasValidMenus || hasValidCtaButton

  return (
    <>
      <section>
        <HeaderWrapper>
          <header className="container lg:[--has-sidebar:1] lg:w-full lg:px-24 md:px-40 py-16 flex items-center justify-between h-full lg:grid lg:grid-cols-[1fr_auto_1fr]">
            {/* Logo */}
            <div className="flex items-center min-w-0">
              {/* Logo - Server Component */}
              {hasLogo && (
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
                    {useInternalLogo ? (
                      <Image
                        src="/chayma-dev-logo.png"
                        alt="Site Logo"
                        width={155}
                        height={40}
                        className="w-[125px] md:w-[155px] max-h-[40px] object-contain"
                      />
                    ) : typeof logoToUse === 'object' &&
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
              )}

            </div>

            {/* Navigation Desktop - toujours centré */}
            {hasValidMenus && (
              <nav className="hidden lg:flex items-center justify-center gap-8">
                <DesktopNav menus={menusToUse} />
              </nav>
            )}

            {/* Actions Desktop & Mobile */}
            <div className="flex items-center gap-4 ml-auto lg:ml-0 lg:justify-end lg:col-start-3">
              {/* CTA Button Desktop - Server Component */}
              {hasValidCtaButton && (
                <div className="hidden lg:block">
                  <CustomLink
                    href={ctaButtonToUse.buttonLink?.url}
                    reference={ctaButtonToUse.buttonLink?.reference}
                    linkType={ctaButtonToUse.buttonLink?.type || 'custom'}
                    newTab={ctaButtonToUse.buttonLink?.newTab || false}
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
                  />
                )}
              </div>
            </div>
          </header>
        </HeaderWrapper>

       
      </section>
    </>
  )
}
