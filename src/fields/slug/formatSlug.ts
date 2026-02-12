import type { FieldHook } from 'payload'

export const formatSlug = (val: string): string | undefined =>
  val
    ?.replace(/[\u0027\u02bc\u2019\u201b\u2032\u0060\u003a]/g, ' ')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')

export const formatSlugHook =
  (fallback: string | string[]): FieldHook =>
  ({ data, operation, value }) => {
    if (typeof value === 'string') {
      return formatSlug(value)
    }

    if (operation === 'create' || data?.slug === undefined) {
      const fallbackFields = Array.isArray(fallback) ? fallback : [fallback]
      const values: string[] = []

      for (const field of fallbackFields) {
        const fallbackData = data?.[field]
        if (typeof fallbackData === 'string' && fallbackData) {
          values.push(formatSlug(fallbackData) || '')
        }
      }

      if (values.length > 0) {
        return values.filter(Boolean).join('-')
      }
    }

    return value
  }
