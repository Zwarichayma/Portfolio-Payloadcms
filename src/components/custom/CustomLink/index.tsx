import { cn } from '@/utilities/ui'
import NextLink from 'next/link'
import React from 'react'

import type { Page, Post } from '@/payload-types'

type CMSLinkType = {
  appearance?: 'inline' | 'default' | 'secondary' | 'link'
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  type?: 'custom' | 'reference' | null
  url?: string | null
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

// Interface pour le composant Link générique
export interface LinkReference {
  relationTo: string
  value:
    | {
        slug?: string
        id?: string
        [key: string]: any
      }
    | string
}

export interface LinkProps extends Omit<React.ComponentProps<typeof NextLink>, 'href'> {
  href?: string | null
  reference?: LinkReference | any
  linkType?: 'none' | 'reference' | 'custom'
  newTab?: boolean
  children: React.ReactNode
  className?: string
}

/**
 * Composant Link générique pour toute l'application
 * Gère les liens personnalisés et les références Payload
 */
export const CustomLink: React.FC<LinkProps> = ({
  href,
  reference,
  linkType = 'none',
  newTab = false,
  children,
  className,
  ...props
}) => {
  // Fonction pour obtenir l'URL finale
  const getUrl = (): string => {
    // Lien personnalisé
    if (linkType === 'custom' && href) {
      return href
    }

    // Référence interne
    if (linkType === 'reference' && reference) {
      // Si c'est un objet de référence avec value
      if (typeof reference === 'object') {
        if ('value' in reference && reference.value) {
          const value = reference.value
          if (typeof value === 'object' && value && 'slug' in value) {
            return `/${value.slug}`
          }
        }
        // Si c'est directement un objet avec slug
        if ('slug' in reference) {
          return `/${reference.slug}`
        }
      }
      // Si c'est un ID string
      if (typeof reference === 'string') {
        return `/${reference}`
      }
    }

    // Fallback vers href s'il existe
    if (href) {
      return href
    }

    // Fallback par défaut
    return '#'
  }

  const url = getUrl()
  const isExternal = url.startsWith('http') || url.startsWith('mailto:') || url.startsWith('tel:')

  // Tous les liens utilisent NextLink avec target approprié
  return (
    <NextLink
      href={url}
      className={className}
      target={newTab || isExternal ? '_blank' : undefined}
      rel={newTab || isExternal ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </NextLink>
  )
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const { type, appearance = 'inline', children, className, label, newTab, reference, url } = props

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${
          reference.value.slug
        }`
      : url

  if (!href) return null

  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <NextLink className={cn(className)} href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </NextLink>
    )
  }

  return (
    <NextLink
      className={cn(
        'inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        className,
      )}
      href={href || url || ''}
      {...newTabProps}
    >
      {label && label}
      {children && children}
    </NextLink>
  )
}
