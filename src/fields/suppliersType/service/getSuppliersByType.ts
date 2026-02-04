import { getSettings } from '@/collections/Settings/services/getSettings'
import config from '@payload-config'
import { getPayload } from 'payload'

export async function getSuppliersByType(type: 'partners' | 'suppliers'): Promise<Supplier[]> {
  try {
    const payload = await getPayload({ config })
    const settings = await getSettings({ payload })
    const supplierStrapiApiUrl = settings?.supplierApiSettings.ApiUrl
    const supplierStrapiApiToken = settings?.supplierApiSettings.ApiToken
    if (!supplierStrapiApiUrl || !supplierStrapiApiToken) {
      console.error('Strapi API URL or Token is not defined in settings.')
      return []
    }
    const apiUrl = `${supplierStrapiApiUrl}/api/suppliers?pagination[pageSize]=100${type === 'partners' ? '&filters[supplier_partner][$eq]=true' : ''}`

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${supplierStrapiApiToken}`,
      },
      next: { revalidate: 0 },
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const supplier = await response.json()
    return (supplier.data as Supplier[]) || []
  } catch (error) {
    console.error('Error fetching companies by type:', error)
    return []
  }
}
