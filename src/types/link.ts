/**
 * Type global pour les champs de lien
 * Utilisé dans tous les composants pour normaliser la structure des liens
 */
export interface Link {
  type?: 'custom' | 'reference'
  url?: string
  href?: string
  label?: string
  newTab?: boolean
  reference?: {
    relationTo: 'pages' | 'posts'
    value: string | number | { id: string; slug?: string }
  }
}
