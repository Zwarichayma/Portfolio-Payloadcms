import type { GlobalConfig } from 'payload'

import { createdByAndUpdatedByFields } from '@/fields/createdByAndUpdatedBy'
import { link } from '@/fields/link'
import { menuField } from '@/fields/menuField'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  label: {
    en: 'Header',
    fr: 'En-tête',
  },
  access: {
    read: () => true,
   
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          label: 'Logo',
          admin: {
            width: '50%',
          },
        },
        link({
          appearances: false,
          disableLabel: true,
          overrides: {
            name: 'logoLink',
            label: 'Lien du Logo',
            admin: {
              width: '50%',
              description:
                "Choisissez vers quelle page ou URL le logo doit rediriger. Par défaut: page d'accueil.",
            },
          },
        }),
      ],
    },
    {
      name: 'menus',
      type: 'array',
      label: 'Navigation Items',
      fields: [menuField()],
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'ctaButton',
      type: 'group',
      label: 'Bouton CTA (Call to Action)',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label du bouton',
        },
        link({
          appearances: false,
          disableLabel: true,
          overrides: {
            name: 'buttonLink',
          },
        }),
      ],
    },
    ...createdByAndUpdatedByFields,
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
