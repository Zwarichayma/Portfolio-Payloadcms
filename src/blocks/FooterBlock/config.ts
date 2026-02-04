import { link } from '@/fields/link'
import type { Block } from 'payload'

export const FooterBlock: Block = {
  slug: 'footerBlock',
  labels: {
    singular: 'Footer Block',
    plural: 'Footer Blocks',
  },
  imageURL: '/Footer Block.png',
  imageAltText: 'Footer Block',
  fields: [
    {
      name: 'overrideLogo',
      type: 'checkbox',
      label: 'Redéfinir le logo de la société',
      defaultValue: false,
      admin: {
        description:
          'Coché : Utilise un logo spécifique pour cette page. ☐ Décoché : Utilise le logo du footer global par défaut.',
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
          },
        }),
      ],
    },
    {
      name: 'overrideServiceDescription',
      type: 'checkbox',
      label: 'Redéfinir la description du service',
      defaultValue: false,
      admin: {
        description:
          'Coché : Personnalise la description du service client. ☐ Décoché : Utilise la configuration du footer global.',
      },
    },
    {
      name: 'serviceDescription',
      type: 'group',
      label: 'Description du Service personnalisée',
      admin: {
        condition: (_, siblingData) => siblingData?.overrideServiceDescription === true,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Titre du Service',
          defaultValue: 'Service client 6j/7',
        },
        {
          name: 'hours',
          type: 'text',
          label: 'Horaires',
          defaultValue: 'De 9h à 20h par téléphone et 24h/24 par e-mail.',
        },
        {
          name: 'responseTime',
          type: 'text',
          label: 'Temps de Réponse',
          defaultValue: 'Réponse en 48h max',
        },
      ],
    },
    {
      name: 'overrideContact',
      type: 'checkbox',
      label: 'Redéfinir les informations de contact',
      defaultValue: false,
      admin: {
        description:
          'Coché : Personnalise les informations de contact. ☐ Décoché : Utilise la configuration du footer global.',
      },
    },
    {
      name: 'contact',
      type: 'array',
      label: 'Informations de contact personnalisées',
      admin: {
        condition: (_, siblingData) => siblingData?.overrideContact === true,
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
        },
        {
          name: 'value',
          type: 'text',
          label: 'Valeur',
          required: true,
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Icône',
        },
      ],
    },
    {
      name: 'overrideSections',
      type: 'checkbox',
      label: 'Redéfinir les sections de navigation',
      defaultValue: false,
      admin: {
        description:
          'Coché : Personnalise les sections de navigation. ☐ Décoché : Utilise les sections du footer global.',
      },
    },
    {
      name: 'sections',
      type: 'array',
      label: 'Sections de Navigation personnalisées',
      admin: {
        condition: (_, siblingData) => siblingData?.overrideSections === true,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Titre de la Section',
          required: true,
        },
        {
          name: 'items',
          type: 'array',
          label: 'Éléments de Navigation',
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Texte du Lien',
              required: true,
            },
            link({
              appearances: false,
              disableLabel: true,
              overrides: {
                name: 'linkData',
                label: 'Lien',
              },
            }),
          ],
        },
      ],
    },
    {
      name: 'overrideCta',
      type: 'checkbox',
      label: 'Redéfinir le bouton CTA',
      defaultValue: false,
      admin: {
        description:
          'Coché : Personnalise le bouton Call-to-Action. ☐ Décoché : Utilise le bouton du footer global.',
      },
    },
    {
      name: 'cta',
      type: 'group',
      label: 'Call-to-Action personnalisé',
      admin: {
        condition: (_, siblingData) => siblingData?.overrideCta === true,
      },
      fields: [
        {
          name: 'buttonText',
          type: 'text',
          label: 'Texte du Bouton',
          defaultValue: 'Prenons rendez-vous',
        },
        link({
          appearances: false,
          disableLabel: true,
          overrides: {
            name: 'buttonLink',
            label: 'Lien du bouton',
          },
        }),
      ],
    },
    {
      name: 'overrideCards',
      type: 'checkbox',
      label: 'Redéfinir les cartes (Selectra & SCE)',
      defaultValue: false,
      admin: {
        description:
          'Coché : Personnalise les cartes Selectra et SCE. ☐ Décoché : Utilise la configuration du footer global.',
      },
    },
    {
      name: 'cards',
      type: 'group',
      label: 'Cartes personnalisées',
      admin: {
        condition: (_, siblingData) => siblingData?.overrideCards === true,
      },
      fields: [
        {
          name: 'selectra',
          type: 'group',
          label: 'Carte Selectra',
          fields: [
            {
              name: 'description',
              type: 'textarea',
              label: 'Description',
              defaultValue:
                'Place des énergies est une Filiale B to B du Groupe Selectra :\\n+ de 1,5 million de clients en Europe',
            },
            {
              name: 'logo',
              type: 'upload',
              label: 'Logo Selectra',
              relationTo: 'media',
            },
          ],
        },
        {
          name: 'sce',
          type: 'group',
          label: 'Carte SCE',
          fields: [
            {
              name: 'subtitle',
              type: 'text',
              label: 'Sous-titre',
              defaultValue: 'Membre fondateur du',
            },
            {
              name: 'logo',
              type: 'upload',
              label: 'Logo SCE',
              relationTo: 'media',
            },
          ],
        },
      ],
    },
    {
      name: 'overrideLegal',
      type: 'checkbox',
      label: 'Redéfinir les mentions légales',
      defaultValue: false,
      admin: {
        description:
          'Coché : Personnalise les liens des mentions légales. ☐ Décoché : Utilise la configuration du footer global.',
      },
    },
    {
      name: 'legal',
      type: 'group',
      label: 'Mentions légales personnalisées',
      admin: {
        condition: (_, siblingData) => siblingData?.overrideLegal === true,
      },
      fields: [
        {
          name: 'links',
          type: 'array',
          label: 'Liens',
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Label',
              required: true,
            },
            link({
              appearances: false,
              disableLabel: true,
              overrides: {
                name: 'linkData',
                label: 'Lien',
              },
            }),
          ],
        },
      ],
    },
  ],
}
