import path from 'path'
import { fileURLToPath } from 'url'

import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const SERVER_URL =
  process.env.SERVER_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined) ||
  process.env.__NEXT_PRIVATE_ORIGIN ||
  'http://localhost:3000'

const isVercel = Boolean(process.env.VERCEL)

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 'standalone' output is only needed for containerized (Docker) deployments.
  // Vercel builds normally and would ignore/mis-handle it.
  ...(isVercel ? {} : { output: 'standalone' }),
  // Avoid ambiguous workspace root detection when a lockfile exists in a parent folder.
  outputFileTracingRoot: __dirname,
  // Bundle the local media folder into the serverless functions so the local
  // `/api/media/file/...` route keeps working on Vercel for media not yet on Blob.
  outputFileTracingIncludes: {
    '/api/[...slug]': ['./media/**/*'],
  },
  poweredByHeader: false,
  images: {
    remotePatterns: [
      ...[SERVER_URL].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
        }
      }),
      // Vercel Blob storage (media uploads in production)
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  reactStrictMode: true,
  redirects,
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
