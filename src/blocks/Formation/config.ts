import { anchorIdField } from '@/fields/anchorIdField'

import type { Block } from 'payload'

export const Formation: Block = {
  slug: 'formation',
  interfaceName: 'FormationBlock',
  fields: [
    anchorIdField('formation'),
    {
      name: 'codeLabel',
      type: 'text',
      label: 'Code Label',
      defaultValue: '// 06 — formation',
      admin: {
        description: 'Badge mono affiché au-dessus du titre (ex: // 06 — formation)',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Section Title',
      defaultValue: 'Formation',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Formations / Certifications',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Titre',
        },
        {
          name: 'organization',
          type: 'text',
          label: 'Organisation / École',
        },
        {
          name: 'date',
          type: 'text',
          label: 'Date',
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Icône',
        },
        {
          name: 'accent',
          type: 'select',
          label: 'Couleur d\'accent',
          options: [
            { label: 'Violet', value: '#7c3aed' },
            { label: 'Ambre', value: '#fbbf24' },
            { label: 'Rose', value: '#f9a8d4' },
            { label: 'Vert', value: '#34d399' },
            { label: 'Bleu', value: '#60a5fa' },
          ],
          defaultValue: '#7c3aed',
        },
      ],
    },
    {
      name: 'displayStyle',
      type: 'select',
      label: 'Display Style',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'List', value: 'list' },
      ],
      defaultValue: 'grid',
    },
    {
      name: 'animationStyle',
      type: 'select',
      label: 'Animation Style',
      options: [
        { label: 'Fade In', value: 'fadeIn' },
        { label: 'Slide Up', value: 'slideUp' },
        { label: 'Scale', value: 'scale' },
      ],
      defaultValue: 'fadeIn',
    },
    {
      name: 'showParticles',
      type: 'checkbox',
      label: 'Show Particle Animation',
      defaultValue: false,
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
    },
  ],
}
