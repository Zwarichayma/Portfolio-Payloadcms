import { privilegesAccess } from '@/access/privilegesAccess'
import { allPrivileges } from '@/collections/Roles/privileges'
import { getUserTenantIDs } from '@/utilities/getUserTenantIDs'
import type { Validate } from 'payload'

export const validateRequirementOfAgence: Validate = (value, { req }) => {
  const userAgences = getUserTenantIDs(req.user)
  // Admins can bypass this validation
  if (
    privilegesAccess([allPrivileges.access.privileges.viewAllAgences.privilegeKey])({ req }) ||
    userAgences.length === 0
  ) {
    return true
  }

  // Non-admin users must provide an agency
  if (!value) {
    // @ts-expect-error - custom translation key
    return req.t('customAgencyField:errorRequired')
  }

  return true
}
