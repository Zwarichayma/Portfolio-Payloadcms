import deepMerge from '@/utilities/deepMerge'
import type { Field, GroupField } from 'payload'

type FooterSectionFieldType = (options?: { overrides?: Partial<GroupField> }) => Field

export const footerSectionField: FooterSectionFieldType = ({ overrides = {} } = {}) => {
  const sectionResult: GroupField = {
    name: 'section',
    type: 'group',
    admin: {
      hideGutter: true,
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
        label: 'Éléments',
        fields: [
          {
            name: 'label',
            type: 'text',
            label: 'Label',
            required: true,
          },
          {
            name: 'href',
            type: 'text',
            label: 'URL',
            required: true,
          },
        ],
      },
    ],
  }

  return deepMerge(sectionResult, overrides)
}
