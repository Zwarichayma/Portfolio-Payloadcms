import { anchorIdField } from '@/fields/anchorIdField'

import type { Block } from 'payload'

export const DeveloperPortfolio: Block = {
  slug: 'developerPortfolio',
  interfaceName: 'DeveloperPortfolioBlock',
  fields: [
    anchorIdField('developerPortfolio'),
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Developer Name',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Job Title',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'profileImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Profile Image',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Links',
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: [
            { label: 'GitHub', value: 'github' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Twitter', value: 'twitter' },
            { label: 'Portfolio', value: 'portfolio' },
            { label: 'Email', value: 'email' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
      maxRows: 5,
    },
    {
      name: 'statusBadge',
      type: 'text',
      label: 'Status Badge',
      admin: {
        description: 'Badge affiché au-dessus du nom (ex: "Disponible — Open to work")',
      },
    },
    {
      name: 'location',
      type: 'text',
      label: 'Location',
    },
    {
      name: 'codeCard',
      type: 'group',
      label: 'Code Card',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Fichier',
          defaultValue: 'profile.ts',
        },
        {
          name: 'variableName',
          type: 'text',
          label: 'Nom de la variable (optionnel)',
          admin: {
            description:
              "Laisser vide pour utiliser automatiquement le Job Title (ex: 'Full Stack Developer' → fullStackDeveloper).",
          },
        },
        {
          name: 'lines',
          type: 'array',
          label: 'Lignes de code',
          fields: [
            {
              name: 'key',
              type: 'text',
              required: true,
              label: 'Clé',
            },
            {
              name: 'value',
              type: 'text',
              required: true,
              label: 'Valeur',
            },
            {
              name: 'color',
              type: 'select',
              label: 'Couleur de la valeur',
              options: [
                { label: 'Vert', value: '#34d399' },
                { label: 'Ambre', value: '#fbbf24' },
                { label: 'Rose', value: '#f9a8d4' },
                { label: 'Violet', value: '#a78bfa' },
                { label: 'Bleu', value: '#60a5fa' },
              ],
              defaultValue: '#34d399',
            },
          ],
        },
        {
          name: 'footerText',
          type: 'text',
          label: 'Texte de pied de carte',
          defaultValue: 'ready to build',
        },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Statistiques',
      maxRows: 4,
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          label: 'Valeur',
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Libellé',
        },
      ],
    },
    {
      name: 'animationStyle',
      type: 'select',
      label: 'Animation Style',
      options: [
        { label: 'Fade In', value: 'fadeIn' },
        { label: 'Slide Up', value: 'slideUp' },
        { label: 'Typewriter', value: 'typewriter' },
        { label: 'Glitch', value: 'glitch' },
      ],
      defaultValue: 'fadeIn',
    },
    {
      name: 'showParticles',
      type: 'checkbox',
      label: 'Show Particle Animation',
      defaultValue: false,
    },
  ],
}
