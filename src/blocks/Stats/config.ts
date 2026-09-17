import { anchorIdField } from '@/fields/anchorIdField'

import type { Block } from 'payload'

export const Stats: Block = {
  slug: 'stats',
  interfaceName: 'StatsBlock',
  fields: [
    anchorIdField('stats'),
    {
      name: 'codeLabel',
      type: 'text',
      label: 'Code Label',
      defaultValue: '// 01 — stats',
      admin: {
        description: 'Badge mono affiché au-dessus du titre (ex: // 01 — stats)',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Statistiques',
      required: true,
      minRows: 1,
      maxRows: 6,
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
      name: 'columns',
      type: 'select',
      label: 'Colonnes',
      options: [
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '6', value: '6' },
      ],
      defaultValue: '3',
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
