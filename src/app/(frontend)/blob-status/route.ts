import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

/**
 * Diagnostic endpoint: tells whether Vercel Blob is enabled at runtime.
 * Visit https://<your-domain>/blob-status after deploying.
 */
export async function GET() {
  return NextResponse.json({
    vercel: Boolean(process.env.VERCEL),
    blobEnabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
    blobStoreId: process.env.BLOB_STORE_ID ? 'set' : 'missing',
  })
}
