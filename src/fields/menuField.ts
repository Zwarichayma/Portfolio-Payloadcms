import type { Field, GroupField } from 'payload'

import deepMerge from '@/utilities/deepMerge'

type MenuFieldType = (options?: { overrides?: Partial<GroupField> }) => Field

export const menuField: MenuFieldType = ({ overrides = {} } = {}) => {
  const menuResult: GroupField = {
    name: 'menu',
    type: 'group',
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        name: 'title',
        type: 'text',
        label: 'Menu Title',
        required: true,
      },
      {
        type: 'row',
        fields: [
          {
            name: 'linkType',
            type: 'radio',
            admin: {
              layout: 'horizontal',
              width: '100%',
            },
            defaultValue: 'none',
            options: [
              {
                label: 'Menu items',
                value: 'none',
              },
              {
                label: 'Internal link',
                value: 'reference',
              },
              {
                label: 'Custom URL',
                value: 'custom',
              },
            ],
          },
        ],
      },
      {
        name: 'reference',
        type: 'relationship',
        admin: {
          condition: (_, siblingData) => siblingData?.linkType === 'reference',
        },
        label: 'Document to link to',
        relationTo: ['pages', 'posts'],
      },
      {
        name: 'href',
        type: 'text',
        admin: {
          condition: (_, siblingData) => siblingData?.linkType === 'custom',
        },
        label: 'Custom URL',
      },
      {
        name: 'items',
        type: 'array',
        label: 'Menu Items',
        admin: {
          condition: (_, siblingData) => siblingData?.linkType === 'none',
        },
        fields: [
          {
            name: 'label',
            type: 'text',
            label: 'Label',
            required: true,
          },
          {
            name: 'icon',
            type: 'upload',
            relationTo: 'media',
            label: 'Icon',
            admin: {
              description: 'Upload an icon for this menu item (SVG recommended)',
            },
          },
          {
            type: 'row',
            fields: [
              {
                name: 'type',
                type: 'radio',
                admin: {
                  layout: 'horizontal',
                  width: '100%',
                },
                defaultValue: 'link',
                options: [
                  {
                    label: 'Link',
                    value: 'link',
                  },
                  {
                    label: 'Button',
                    value: 'button',
                  },
                ],
              },
            ],
          },
          {
            type: 'row',
            fields: [
              {
                name: 'linkType',
                type: 'radio',
                admin: {
                  layout: 'horizontal',
                  width: '100%',
                },
                defaultValue: 'reference',
                options: [
                  {
                    label: 'Internal link',
                    value: 'reference',
                  },
                  {
                    label: 'Custom URL',
                    value: 'custom',
                  },
                ],
              },
            ],
          },
          {
            name: 'reference',
            type: 'relationship',
            admin: {
              condition: (_, siblingData) => siblingData?.linkType === 'reference',
            },
            label: 'Document to link to',
            relationTo: ['pages', 'posts'],
          },
          {
            name: 'href',
            type: 'text',
            admin: {
              condition: (_, siblingData) => siblingData?.linkType === 'custom',
            },
            label: 'Custom URL',
          },
        ],
      },

      {
        name: 'actionLink',
        type: 'group',
        label: 'Action Link (Optional)',
        admin: {
          condition: (_, siblingData) => siblingData?.linkType === 'none',
        },
        fields: [
          {
            name: 'label',
            type: 'text',
            label: 'Label',
          },
          {
            type: 'row',
            fields: [
              {
                name: 'linkType',
                type: 'radio',
                admin: {
                  layout: 'horizontal',
                  width: '100%',
                },
                defaultValue: 'reference',
                options: [
                  {
                    label: 'Internal link',
                    value: 'reference',
                  },
                  {
                    label: 'Custom URL',
                    value: 'custom',
                  },
                ],
              },
            ],
          },
          {
            name: 'reference',
            type: 'relationship',
            admin: {
              condition: (_, siblingData) => siblingData?.linkType === 'reference',
            },
            label: 'Document to link to',
            relationTo: ['pages', 'posts'],
          },
          {
            name: 'href',
            type: 'text',
            admin: {
              condition: (_, siblingData) => siblingData?.linkType === 'custom',
            },
            label: 'Custom URL',
          },
        ],
      },
    ],
  }

  return deepMerge(menuResult, overrides)
}
