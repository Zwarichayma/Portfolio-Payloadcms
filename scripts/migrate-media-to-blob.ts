/**
 * Migre les médias locaux vers Vercel Blob et met à jour les documents Payload.
 *
 * Usage (avec la DB de PRODUCTION + le token Blob) :
 *   $env:DATABASE_URL="<ta-db-prod>"; $env:BLOB_READ_WRITE_TOKEN="<ton-token>"
 *   npm run migrate:blob
 *
 * Le script cherche chaque fichier (par `filename`) dans :
 *   - ./media
 *   - ./Downloads (home)
 *   - ./src/imports
 * Puis l'upload sur Blob (le plugin met à jour `url`/`filename`).
 */
import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const HOME = process.env.HOME || process.env.USERPROFILE || ''

const SEARCH_DIRS = [
  path.resolve(process.cwd(), 'media'),
  path.join(HOME, 'Downloads'),
  path.resolve(process.cwd(), 'src', 'imports'),
]

const findFile = (filename: string): string | null => {
  for (const dir of SEARCH_DIRS) {
    const candidate = path.join(dir, filename)
    if (fs.existsSync(candidate)) return candidate
  }
  return null
}

const run = async () => {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('BLOB_READ_WRITE_TOKEN manquant — impossible d’uploader vers Blob.')
    process.exit(1)
  }

  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'media',
    limit: 1000,
    pagination: false,
    depth: 0,
  })

  let migrated = 0
  let skipped = 0
  const missing: string[] = []

  for (const doc of docs) {
    const filename = doc.filename
    if (!filename) continue

    if (typeof doc.url === 'string' && doc.url.startsWith('http')) {
      skipped++
      continue
    }

    const filePath = findFile(filename)
    if (!filePath) {
      missing.push(filename)
      continue
    }

    const data = fs.readFileSync(filePath)

    await payload.update({
      collection: 'media',
      id: doc.id,
      data: {},
      file: {
        data,
        mimetype: doc.mimeType || 'application/octet-stream',
        name: filename,
        size: data.length,
      },
    })

    payload.logger.info(`✔ migré : ${filename}`)
    migrated++
  }

  console.log('\n──────────────────────────────')
  console.log(`Migrés   : ${migrated}`)
  console.log(`Déjà Blob: ${skipped}`)
  console.log(`Manquants: ${missing.length}`)
  if (missing.length > 0) {
    console.log('\nFichiers introuvables (à re-uploader à la main) :')
    missing.forEach((f) => console.log(`  - ${f}`))
  }

  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
