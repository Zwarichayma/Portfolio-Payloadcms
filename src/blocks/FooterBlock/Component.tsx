import type { Footer as FooterType, Media as MediaType } from '@/payload-types'
import React from 'react'
import { FooterClient } from './FooterClient'
import { getGlobalFooter } from './getGlobalFooter'

// Types TypeScript basés sur les types Payload générés
type ServiceDescriptionType = NonNullable<FooterType['company']>['serviceDescription']
type ContactType = NonNullable<FooterType['company']>['contact']
type SectionsType = FooterType['sections']
type CtaType = FooterType['cta']
type CardsType = FooterType['cards']
type LegalType = FooterType['legal']

// Type pour FooterBlock
export interface FooterBlockProps {
  blockType: 'footerBlock'
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
  id?: string | null
  blockName?: string | null
}

export const FooterBlock: React.FC<FooterBlockProps> = async ({
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
  ...rest
}) => {
  // Fetch global footer data on the server
  const globalFooter = await getGlobalFooter()

  return (
    <FooterClient
      globalFooter={globalFooter}
      overrideLogo={overrideLogo}
      overrideServiceDescription={overrideServiceDescription}
      overrideContact={overrideContact}
      overrideSections={overrideSections}
      overrideCta={overrideCta}
      overrideCards={overrideCards}
      overrideLegal={overrideLegal}
      logo={logo}
      logoLink={logoLink}
      serviceDescription={serviceDescription}
      contact={contact}
      sections={sections}
      cta={cta}
      cards={cards}
      legal={legal}
    />
  )
}
