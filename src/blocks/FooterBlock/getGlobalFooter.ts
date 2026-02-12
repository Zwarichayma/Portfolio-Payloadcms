import type { Footer as FooterType } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function getGlobalFooter(): Promise<FooterType | null> {
  try {
    const payload = await getPayload({ config: configPromise })
    const footer = await payload.findGlobal({
      slug: 'footer',
    })
    return footer
  } catch (error) {
    console.error('Error fetching global footer:', error)
    return null
  }
}
