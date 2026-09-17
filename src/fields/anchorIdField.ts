import type { Block, Field } from 'payload'

export const anchorIdField = (defaultValue?: string): Field => ({
  name: 'anchorId',
  type: 'text',
  label: { fr: "ID d'ancre", en: 'Anchor ID' },
  defaultValue,
  admin: {
    readOnly: true,
    description: {
      fr: "ID unique pour cette section (liens d'ancre, ex: #services).",
      en: 'Unique ID for this section (anchor links, e.g. #services).',
    },
  },
})

export const withAnchorId = (block: Block): Block => {
  const alreadyHasAnchor = block.fields?.some(
    (field) => 'name' in field && field.name === 'anchorId',
  )

  if (alreadyHasAnchor) return block

  return {
    ...block,
    fields: [anchorIdField(block.slug), ...(block.fields || [])],
  }
}
