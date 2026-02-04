import { customAgenceRelationField } from '@/fields/customAgenceRelation'
import { getTenantFromCookie } from '@payloadcms/plugin-multi-tenant/utilities'
import type { CollectionConfig } from 'payload'

/**
 * Wraps a CollectionConfig and injects agence tenant filtering and fields
 * 
 * This wrapper automatically adds:
 * - Custom baseFilter for tenant-based document filtering
 * - Agence relationship field
 * - Authorization status select field (granted/pending/rejected)
 * 
 * IMPORTANT: Collections using this wrapper MUST be registered in the multiTenantPlugin
 * configuration (src/plugins/index.ts) with these options:
 * 
 * @example
 * ```typescript
 * collections: {
 *   'your-collection': {
 *     customTenantField: true,    // Use custom tenant field implementation
 *     useTenantAccess: false,     // Disable plugin's default access control
 *     useBaseFilter: false,       // Disable plugin's default filter
 *   }
 * }
 * ```
 * 
 * @param config - The base collection configuration
 * @returns The enhanced collection configuration with tenant support
 */
export const withAgenceTenant = (config: CollectionConfig): CollectionConfig => {
  return {
    ...config,
    admin: {
      ...config.admin,
      baseFilter: ({ req }) => {
        const agence = getTenantFromCookie(req.headers, 'text') as string | null
        if (!agence) {
          // If no tenant selected, show only docs without a tenant
          return null
        }

        // If a agence exists, show docs that either have the same agence or no agence
        return {
          or: [
            { agence: { equals: agence } },
            { agence: { exists: false } },
            { agence: { equals: null } },
          ],
        }
      },
    },
    fields: [...config.fields, ...customAgenceRelationField()],
  }
}
