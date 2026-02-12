import type { Field } from 'payload'

export const createdByAndUpdatedByFields: Field[] = [
  {
    name: 'createdBy',
    type: 'relationship',
    relationTo: 'users',
    label: {
      en: 'Created By',
      fr: 'Créé par',
    },
    admin: {
      position: 'sidebar',
      readOnly: true,
    },
    hooks: {
      beforeChange: [
        ({ req, operation }) => {
          if (operation === 'create' && req.user) {
            return req.user.id
          }
        },
      ],
    },
  },
  {
    name: 'updatedBy',
    type: 'relationship',
    relationTo: 'users',
    label: {
      en: 'Updated By',
      fr: 'Mis à jour par',
    },
    admin: {
      position: 'sidebar',
      readOnly: true,
    },
    hooks: {
      beforeChange: [
        ({ req, operation }) => {
          if (operation === 'create' && req.user) {
            return req.user.id
          }
        },
      ],
      afterChange: [
        ({ req, operation }) => {
          if (operation === 'update' && req.user) {
            return req.user.id
          }
        },
      ],
    },
  },
]
