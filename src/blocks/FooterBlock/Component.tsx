import type { Media as MediaType } from '@/payload-types'
import React from 'react'
import { FooterClient } from './FooterClient'
import { getGlobalFooter } from './getGlobalFooter'

export interface FooterBlockProps {
  blockType: 'footerBlock'
  overrideLogo?: boolean | null
  overrideServiceDescription?: boolean | null
  overrideContact?: boolean | null
  overrideSections?: boolean | null
  overrideCta?: boolean | null
  overrideCards?: boolean | null
  overrideLegal?: boolean | null
  logo?: string | MediaType | null
  logoLink?: Record<string, unknown> | null
  serviceDescription?: {
    title?: string | null
    hours?: string | null
    responseTime?: string | null
  } | null
  contact?: {
    label?: string | null
    value?: string | null
    icon?: string | MediaType | null
    id?: string | null
  }[] | null
  sections?: {
    title?: string | null
    items?: {
      label?: string | null
      linkData?: Record<string, unknown> | null
      id?: string | null
    }[] | null
    id?: string | null
  }[] | null
  cta?: {
    buttonText?: string | null
    buttonLink?: Record<string, unknown> | null
  } | null
  cards?: {
    selectra?: {
      description?: string | null
      logo?: string | MediaType | null
    } | null
    sce?: {
      subtitle?: string | null
      logo?: string | MediaType | null
    } | null
  } | null
  legal?: {
    links?: {
      label?: string | null
      linkData?: Record<string, unknown> | null
      id?: string | null
    }[] | null
  } | null
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
}) => {
  const globalFooter = await getGlobalFooter()

  return (
    <FooterClient
      globalFooter={globalFooter as any}
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
