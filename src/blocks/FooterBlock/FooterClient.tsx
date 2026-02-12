'use client'

import CustomText from '@/components/custom/custom-text'
import { CustomButton } from '@/components/custom/CustomButton'
import { CustomLink } from '@/components/custom/CustomLink'
import { Media as MediaComponent } from '@/components/Media'
import type { Footer as FooterType, Media as MediaType } from '@/payload-types'
import React from 'react'

// Types TypeScript basés sur les types Payload générés
type ServiceDescriptionType = NonNullable<FooterType['company']>['serviceDescription']
type ContactType = NonNullable<FooterType['company']>['contact']
type SectionsType = FooterType['sections']
type CtaType = FooterType['cta']
type CardsType = FooterType['cards']
type LegalType = FooterType['legal']

// Helper function to get link props from either new or legacy format
const getLinkProps = (item: any) => {
  // New format with linkData
  if (item.linkData) {
    return {
      href: item.linkData.url,
      reference: item.linkData.reference,
      linkType: item.linkData.type || 'custom',
      newTab: item.linkData.newTab || false,
    }
  }
  // Legacy format with href
  if (item.href) {
    return {
      href: item.href,
      reference: null,
      linkType: 'custom' as const,
      newTab: false,
    }
  }
  // Fallback
  return {
    href: '#',
    reference: null,
    linkType: 'custom' as const,
    newTab: false,
  }
}

export interface FooterClientProps {
  // Data passed from server component
  globalFooter?: FooterType | null
  // Override flags
  overrideLogo?: boolean | null
  overrideServiceDescription?: boolean | null
  overrideContact?: boolean | null
  overrideSections?: boolean | null
  overrideCta?: boolean | null
  overrideCards?: boolean | null
  overrideLegal?: boolean | null
  // Content props
  logo?: string | MediaType | null
  logoLink?: any | null
  serviceDescription?: ServiceDescriptionType | null
  contact?: ContactType | null
  sections?: SectionsType | null
  cta?: CtaType | null
  cards?: CardsType | null
  legal?: LegalType | null
}

export const FooterClient: React.FC<FooterClientProps> = ({
  globalFooter,
  overrideLogo,
  overrideServiceDescription,
  overrideContact,
  overrideSections,
  overrideCta,
  overrideCards,
  overrideLegal,
  logo,
  logoLink,
  serviceDescription,
  contact,
  sections,
  cta,
  cards,
  legal,
}) => {
  // Logique de fallback pour chaque élément
  // Si override est coché, utiliser UNIQUEMENT les données override (même si vides)
  // Sinon, utiliser le global
  const logoToUse = overrideLogo ? logo : globalFooter?.company?.logo
  const serviceDescriptionToUse = overrideServiceDescription
    ? serviceDescription
    : globalFooter?.company?.serviceDescription
  const contactToUse = overrideContact ? contact : globalFooter?.company?.contact

  // Sections dynamiques - Si override est coché, utiliser UNIQUEMENT sections override (pas de fallback au global)
  const sectionsToDisplay = overrideSections ? sections : globalFooter?.sections

  const ctaToUse = overrideCta ? cta : globalFooter?.cta
  const cardsToUse = overrideCards ? cards : globalFooter?.cards
  const legalToUse = overrideLegal ? legal : globalFooter?.legal

  // Vérifier s'il y a quelque chose à afficher dans le footer
  const hasLogo = !!logoToUse
  const hasServiceDescription = !!serviceDescriptionToUse
  const hasContact = !!(contactToUse && contactToUse.length > 0)
  const hasSections = !!(sectionsToDisplay && sectionsToDisplay.length > 0)
  const hasCta = !!(ctaToUse && ctaToUse.buttonText)

  // Vérifier si les cartes ont du contenu
  const hasSelectraCard = !!(
    cardsToUse?.selectra &&
    (cardsToUse.selectra.logo || cardsToUse.selectra.description)
  )
  const hasSceCard = !!(cardsToUse?.sce && (cardsToUse.sce.logo || cardsToUse.sce.subtitle))
  const hasCards = hasSelectraCard || hasSceCard

  const hasLegal = !!(legalToUse && legalToUse.links && legalToUse.links.length > 0)

  const shouldShowFooter =
    hasLogo || hasServiceDescription || hasContact || hasSections || hasCta || hasCards || hasLegal

  // Ne pas rendre le footer s'il n'y a rien à afficher
  if (!shouldShowFooter) {
    return null
  }

  return (
    <footer className="bg-secondary text-white relative">
      {/* Blue top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-primary" />

      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-32 mb-32">
          {/* Columns 1-2: Logo and Contact */}
          <div className="col-span-1 lg:col-span-2">
            {/* Logo */}
            {hasLogo && (
              <div className="flex items-center mb-16">
                {logoLink ? (
                  <CustomLink
                    href={logoLink.url}
                    reference={logoLink.reference}
                    linkType={logoLink.type || 'custom'}
                    newTab={logoLink.newTab || false}
                  >
                    <MediaComponent
                      resource={logoToUse}
                      alt="Place des Énergies"
                      imgClassName="w-[230px] h-auto"
                    />
                  </CustomLink>
                ) : (
                  <MediaComponent
                    resource={logoToUse}
                    alt="Place des Énergies"
                    imgClassName="w-[230px] h-auto"
                  />
                )}
              </div>
            )}

            {/* Service Description */}
            {hasServiceDescription && serviceDescriptionToUse && (
              <CustomText
                variant="body"
                font="karla"
                fontWeight="medium"
                tracking="standard"
                customColor="white"
                className="mb-48"
              >
                {serviceDescriptionToUse.title}
                <br />
                {serviceDescriptionToUse.hours}
                <br />
                {serviceDescriptionToUse.responseTime}
              </CustomText>
            )}

            {/* Contact Info */}
            {hasContact && contactToUse && (
              <div>
                {contactToUse.map((contactItem, index) => (
                  <div key={index} className="flex items-center gap-7 mb-16">
                    {contactItem.icon && (
                      <MediaComponent
                        resource={contactItem.icon}
                        alt={contactItem.label || 'Contact'}
                        className="w-[20px] h-[20px] flex-shrink-0"
                      />
                    )}
                    <div>
                      {contactItem.value && (
                        <CustomText
                          variant="bodySpaced"
                          font="karla"
                          fontWeight="medium"
                          tracking="standard"
                          customColor="white"
                          className="block"
                        >
                          {contactItem.value}
                        </CustomText>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Button CTA - Mobile Only */}
            {hasCta && ctaToUse && (
              <div className="mt-32 lg:hidden">
                {(() => {
                  const linkProps = getLinkProps(ctaToUse)
                  return (
                    <CustomLink
                      href={linkProps.href}
                      reference={linkProps.reference}
                      linkType={linkProps.linkType}
                      newTab={linkProps.newTab}
                    >
                      <CustomButton variant="primary">{ctaToUse.buttonText}</CustomButton>
                    </CustomLink>
                  )
                })()}
              </div>
            )}
          </div>

          {/* Dynamic Sections - Responsive */}
          {hasSections && (
            <div className="col-span-1 lg:col-span-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-32">
                {sectionsToDisplay?.map((section: any, sectionIndex: number) => (
                  <div key={sectionIndex}>
                    <CustomText
                      variant="bodyCompact"
                      font="bricolage"
                      fontWeight="bold"
                      tracking="standard"
                      customColor="var(--gray-100)"
                      className="mb-32"
                    >
                      {section.title}
                    </CustomText>
                    <ul className="space-y-32">
                      {section.items?.map((item: any, itemIndex: number) => {
                        const linkProps = getLinkProps(item)
                        return (
                          <li key={itemIndex}>
                            <CustomLink
                              href={linkProps.href}
                              reference={linkProps.reference}
                              linkType={linkProps.linkType}
                              newTab={linkProps.newTab}
                              className="hover:text-white transition-colors"
                            >
                              <CustomText
                                variant="bodyCompact"
                                font="karla"
                                fontWeight="medium"
                                tracking="standard"
                                customColor="var(--gray-300)"
                              >
                                {item.label}
                              </CustomText>
                            </CustomLink>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CTA and Cards row - Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-32">
          {/* Button - Desktop Only */}
          {hasCta && ctaToUse && (
            <div className="hidden lg:flex col-span-1 md:col-span-2 lg:col-span-2 items-center">
              {(() => {
                const linkProps = getLinkProps(ctaToUse)
                return (
                  <CustomLink
                    href={linkProps.href}
                    reference={linkProps.reference}
                    linkType={linkProps.linkType}
                    newTab={linkProps.newTab}
                  >
                    <CustomButton variant="primary">{ctaToUse.buttonText}</CustomButton>
                  </CustomLink>
                )
              })()}
            </div>
          )}

          {/* Selectra Card */}
          {hasSelectraCard && (
            <div className="col-span-1 md:col-span-1 lg:col-span-2 h-full">
              <div className="bg-secondary-dark px-24 py-16 rounded h-full flex flex-col">
                <div className="flex items-center gap-32 mb-16">
                  {cardsToUse?.selectra?.logo && (
                    <MediaComponent
                      resource={cardsToUse.selectra.logo}
                      alt="Selectra"
                      imgClassName="w-full h-auto"
                    />
                  )}
                </div>
                <div className="flex-1">
                  {cardsToUse?.selectra?.description && (
                    <CustomText
                      variant="tiny"
                      font="karla"
                      fontWeight="medium"
                      tracking="standard"
                      customColor="var(--gray-300)"
                    >
                      {cardsToUse.selectra.description.split('\\n').map((line, index, arr) => (
                        <span key={index}>
                          {line}
                          {index < arr.length - 1 && <br />}
                        </span>
                      ))}
                    </CustomText>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* SCE Card */}
          {hasSceCard && (
            <div className="col-span-1 md:col-span-1 lg:col-span-2 h-full">
              <div className="bg-secondary-dark px-24 py-16 rounded h-full flex flex-col">
                {cardsToUse?.sce?.subtitle && (
                  <CustomText
                    variant="tiny"
                    font="karla"
                    fontWeight="medium"
                    tracking="standard"
                    customColor="var(--gray-300)"
                    className="mb-16"
                  >
                    {cardsToUse.sce.subtitle}
                  </CustomText>
                )}
                <div className="">
                  {cardsToUse?.sce?.logo && (
                    <MediaComponent
                      resource={cardsToUse.sce.logo}
                      alt="SCE"
                      imgClassName="w-full h-auto"
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Legal Links - Responsive */}
        {hasLegal && legalToUse?.links && (
          <div className="mt-32 pt-20 border-t border-gray-300/50">
            <div className="flex flex-wrap gap-32">
              {legalToUse.links.map((linkItem, index) => {
                const linkProps = getLinkProps(linkItem)
                return (
                  <CustomLink
                    key={index}
                    href={linkProps.href}
                    reference={linkProps.reference}
                    linkType={linkProps.linkType}
                    newTab={linkProps.newTab}
                    className="hover:text-white transition-colors"
                  >
                    <CustomText
                      variant="tiny"
                      font="karla"
                      tracking="standard"
                      customColor="var(--gray-300)"
                    >
                      {linkItem.label}
                    </CustomText>
                  </CustomLink>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </footer>
  )
}
