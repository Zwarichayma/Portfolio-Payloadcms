import { privilegesAccess } from '@/access/privilegesAccess'
import { allPrivileges } from '@/collections/Roles/privileges'
import type { RelationshipField, SelectField } from 'payload'
import { validateRequirementOfAgence } from './validateRequirementOfAgence'

type Overrides = {
  relationshipOverrides?: Partial<RelationshipField>
}

type Slug = (overrides?: Overrides) => [RelationshipField, SelectField]

export const customAgenceRelationField: Slug = (overrides = {}) => {
  const { relationshipOverrides } = overrides

  // @ts-expect-error - ts mismatch Partial<RelationshipField> with RelationshipField
  const relationshipField: RelationshipField = {
    name: 'agence',
    type: 'relationship',
    relationTo: 'agences',
    required: false,
    hasMany: true,
    label: {
      en: 'Agency',
      fr: 'Agence',
    },
    admin: {
      position: 'sidebar',
    },
    validate: validateRequirementOfAgence,
    ...relationshipOverrides,
  }

  const authorizationField: SelectField = {
    name: 'authorization',
    type: 'select',
    required: true,
    defaultValue: 'pending',
    access: {
      create: privilegesAccess([
        allPrivileges.access.privileges.authorizationManageCreate.privilegeKey,
      ]),
      read: privilegesAccess([
        allPrivileges.access.privileges.authorizationManageRead.privilegeKey,
      ]),
      update: privilegesAccess([
        allPrivileges.access.privileges.authorizationManageUpdate.privilegeKey,
      ]),
    },
    label: {
      en: 'Authorization Status',
      fr: "Statut d'autorisation",
    },
    options: [
      {
        label: {
          en: 'Granted',
          fr: 'Accordé',
        },
        value: 'granted',
      },
      {
        label: {
          en: 'Pending',
          fr: 'En attente',
        },
        value: 'pending',
      },
      {
        label: {
          en: 'Rejected',
          fr: 'Rejeté',
        },
        value: 'rejected',
      },
    ],
    admin: {
      position: 'sidebar',
      description: {
        en: 'This attribution will be displayed only if it is granted. ‘Pending’ means the attribution is awaiting approval. ‘Rejected’ means the attribution was denied.',
        fr: "Cette attribution ne sera affichée que si elle est accordée. « En attente » signifie que l'attribution est en attente d'approbation. « Rejeté » signifie que l'attribution a été refusée.",
      },
    },
    hooks: {
      beforeChange: [
        ({ req }) => {
          if (req.user && req.user.trusted === true) {
            return 'granted'
          }
        },
      ],
    },
  }

  return [relationshipField as RelationshipField, authorizationField as SelectField]
}
