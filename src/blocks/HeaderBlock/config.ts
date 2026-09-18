import { link } from '@/fields/link'
import { menuField } from '@/fields/menuField'
import type { Block } from 'payload'

export const HeaderBlock: Block = {
  slug: 'headerBlock',
  interfaceName: 'HeaderBlockProps',
  labels: {
    singular: 'Header Block',
    plural: 'Header Blocks',
  },
  imageURL: '/Header Block.png',
  imageAltText: 'Header Block',
  fields: [
    {
      name: 'anchorId',
      type: 'text',
      label: { fr: "ID d'ancre", en: 'Anchor ID' },
      defaultValue: 'header-block',
      admin: {
        readOnly: true,
        description: {
          fr: "ID d'ancre unique pour cette section",
          en: 'Unique anchor ID for this section',
        },
      },
    },
    {
      name: 'showLogo',
      type: 'checkbox',
      label: 'Afficher le logo',
      defaultValue: true,
      admin: {
        description:
          'Coché : affiche le logo dans le header. Décoché (ou logo vide) : le logo est masqué et les menus sont centrés.',
      },
    },
    {
      name: 'overrideLogo',
      type: 'checkbox',
      label: 'Redéfinir le logo',
      defaultValue: false,
      admin: {
        description:
          'Coché : Utilise un logo spécifique pour cette page. ☐ Décoché : Utilise le logo du header global par défaut.',
      },
    },
    {
      type: 'row',
      admin: {
        condition: (_, siblingData) => siblingData?.overrideLogo === true,
      },
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          label: 'Logo personnalisé',
          admin: {
            width: '50%',
          },
        },
        link({
          appearances: false,
          disableLabel: true,
          overrides: {
            name: 'logoLink',
            label: 'Lien du Logo personnalisé',
            admin: {
              width: '50%',
              description: 'Choisissez vers quelle page ou URL ce logo doit rediriger.',
            },
            fields: [
              {
                name: 'url',
                type: 'text',
                admin: {
                  condition: (_, siblingData) => siblingData?.type === 'custom',
                },
                label: 'Custom URL',
                defaultValue: '/accueil',
              },
            ],
          },
        }),
      ],
    },
    {
      name: 'overrideMenus',
      type: 'checkbox',
      label: 'Redéfinir les menus de navigation',
      defaultValue: false,
      admin: {
        description:
          'Coché : Crée des menus de navigation personnalisés pour cette page. ☐ Décoché : Utilise les menus du header global par défaut.',
      },
    },
    {
      name: 'customMenus',
      type: 'array',
      label: 'Menus personnalisés',
      admin: {
        condition: (_, siblingData) => siblingData?.overrideMenus === true,
        description:
          'Configurez ici UNIQUEMENT les menus spécifiques à cette page. Ils remplaceront complètement les menus du header global. Vous pouvez créer autant de menus que nécessaire.',
      },
      fields: [menuField()],
    },
    {
      name: 'overrideCtaButton',
      type: 'checkbox',
      label: 'Redéfinir le bouton CTA',
      defaultValue: false,
      admin: {
        description:
          'Coché : Utilise un bouton CTA (Call-to-Action) personnalisé pour cette page. ☐ Décoché : Utilise le bouton du header global par défaut.',
      },
    },
    {
      name: 'ctaButton',
      type: 'group',
      label: 'Bouton CTA personnalisé',
      admin: {
        condition: (_, siblingData) => siblingData?.overrideCtaButton === true,
        description:
          'Configurez ici UNIQUEMENT le bouton Call-to-Action spécifique à cette page. Il remplacera complètement le bouton du header global.',
      },
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

  ],
  
}
