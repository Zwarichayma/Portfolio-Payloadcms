import type { CollectionAfterChangeHook } from 'payload'
import sharp from 'sharp'

export const generateBlurDataURL: CollectionAfterChangeHook = async ({ doc, req }) => {
  // Vérifie qu'il y a bien un fichier image
  if (!doc.url || !doc.mimeType || !doc.filename) return doc
  if (!doc.mimeType.startsWith('image/')) return doc
  if (doc.mimeType === 'image/svg+xml') return doc // pas de blur pour SVG
  if (doc.blurDataURL) return doc // déjà généré

  const uploadedFile = req.file as { data?: Buffer } | undefined

  try {
    let blurBuffer: Buffer | undefined

    // Utilise le buffer du fichier uploadé si disponible
    if (uploadedFile?.data) {
      blurBuffer = await sharp(uploadedFile.data).resize(10).toBuffer()
    } else if (doc.filename) {
      // Sinon, lit le fichier depuis le disque
      const fs = await import('fs')
      const filePath = `${process.cwd()}/media/${doc.filename}`

      if (fs.existsSync(filePath)) {
        blurBuffer = await sharp(filePath).resize(10).toBuffer()
      } else {
        console.warn('Fichier image introuvable pour blurDataURL:', filePath)
        return doc
      }
    }

    if (blurBuffer) {
      const base64 = blurBuffer.toString('base64')
      const blurDataURL = `data:${doc.mimeType};base64,${base64}`

      await req.payload.update({
        collection: 'media',
        id: doc.id,
        data: { blurDataURL },
        req,
      })
    }
  } catch (e) {
    console.error('Erreur génération blurDataURL:', e)
  }

  return doc
}
