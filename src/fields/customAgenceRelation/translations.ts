import type { NestedKeysStripped } from '@payloadcms/translations'
import { enTranslations } from '@payloadcms/translations/languages/en'

export const customAgenceRelationFieldTranslations = {
  en: {
    customAgencyField: {
      errorRequired: 'Agency is required',
    },
    auth: {
      noPrivileges: 'Access denied. User does not have any privileges.',
    },
  },
  fr: {
    customAgencyField: {
      errorRequired: "L'agence est requise",
    },
    auth: {
      noPrivileges: "Accès refusé. L'utilisateur n'a aucun privilège.",
    },
  },
}

export type CustomAgenceTranslationsObject = typeof customAgenceRelationFieldTranslations.en &
  typeof enTranslations
export type CustomAgenceTranslationsKeys = NestedKeysStripped<CustomAgenceTranslationsObject>
