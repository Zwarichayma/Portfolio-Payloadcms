import type { CollectionConfig } from 'payload'

import { createRichTextField } from '@/fields/richTextField'
import { anyone } from '../../access/anyone'

import { generateBlurDataURL } from './hooks/generateBlurDataURL'


export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: anyone,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: {
        en: 'Display Name',
        fr: "Nom d'affichage",
      },
      admin: {
        description: {
          en: 'A user-friendly name for the media item',
          fr: "Un nom convivial pour l'élément média",
        },
      },
    },
    {
      name: 'filename',
      label: {
        en: 'Filename',
        fr: 'Nom de fichier',
      },
      type: 'text',
      admin: {
        description: {
          en: 'Original filename',
          fr: 'Nom de fichier original',
        },
      },
    },
    {
      name: 'alt',
      type: 'text',
      label: {
        en: 'Alt Text',
        fr: 'Texte Alt',
      },
      admin: {
        description: {
          en: 'Alternative text for the media item, used for accessibility and SEO',
          fr: "Texte alternatif pour l'élément média, utilisé pour l'accessibilité et le SEO",
        },
      },
    },
    createRichTextField({
      name: 'caption',
      label: 'Légende',
      required: false,
      additionalProps: {},
    }),
    {
      name: 'blurDataURL',
      type: 'text',
      admin: {
        hidden: true,
      },
      label: {
        en: 'Blur Placeholder',
        fr: 'Placeholder flou',
      },
    },
  ],
  hooks: {
 
    afterChange: [generateBlurDataURL],
  },
  upload: {
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        withoutEnlargement: false,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
        withoutEnlargement: false,
      },
      {
        name: 'small',
        width: 600,
        withoutEnlargement: false,
      },
      {
        name: 'medium',
        width: 900,
        withoutEnlargement: false,
      },
      {
        name: 'large',
        width: 1400,
        withoutEnlargement: false,
      },
      {
        name: 'xlarge',
        width: 1920,
        withoutEnlargement: false,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
        withoutEnlargement: false,
      },
    ],
    modifyResponseHeaders({ headers }) {
      const CACHE_AGE = 30 * 24 * 60 * 60
      headers.set('Cache-Control', `public, max-age=${CACHE_AGE}`)
      return headers
    },
  },
}
