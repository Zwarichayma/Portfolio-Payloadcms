import { anchorIdField } from '@/fields/anchorIdField'
import type { Block } from 'payload'

export const SimpleFooter: Block = {
  slug: 'simpleFooter',
  interfaceName: 'SimpleFooterBlock',
  labels: {
    singular: 'Simple Footer',
    plural: 'Simple Footers',
  },
  fields: [
    anchorIdField('simpleFooter'),
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      defaultValue: 'Zwarichayma',
    },
    {
      name: 'tagline',
      type: 'textarea',
      label: 'Tagline',
      defaultValue: 'Building fast, accessible and delightful web experiences.',
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Links',
      maxRows: 6,
      fields: [
        {
          name: 'platform',
          type: 'select',
          label: 'Platform',
          options: [
            { label: 'GitHub', value: 'github' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Twitter', value: 'twitter' },
            { label: 'Portfolio', value: 'portfolio' },
            { label: 'Email', value: 'email' },
          ],
          defaultValue: 'github',
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
          required: true,
        },
      ],
    },
    {
      name: 'links',
      type: 'array',
      label: 'Quick Links',
      maxRows: 8,
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
          required: true,
        },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      label: 'Copyright',
      defaultValue: '© 2026 All rights reserved.',
    },
  ],
}
