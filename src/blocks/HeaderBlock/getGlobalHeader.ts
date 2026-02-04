import type { Header as HeaderType } from '@/payload-types'
import { getPayload } from 'payload'

// Server-side function to fetch global header data
export const getGlobalHeader = async (): Promise<HeaderType | null> => {
  try {
    const { default: config } = await import('@/payload.config')
    const payload = await getPayload({ config })

    const globalData = await payload.findGlobal({
      slug: 'header',
    })

    return globalData as HeaderType
  } catch (error) {
    console.error('Error fetching global header:', error)
    return null
  }
}
