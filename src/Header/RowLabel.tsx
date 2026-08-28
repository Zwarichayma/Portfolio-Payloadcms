'use client'
import type { Header } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Header['menus']>[number]>()

  const title = data?.data?.menu?.title
  const label = title
    ? `Menu ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${title}`
    : 'Row'

  return <div>{label}</div>
}
