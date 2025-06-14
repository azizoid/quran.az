import { Db } from 'mongodb'

import { DataPropsLatinized } from '@/helpers/types'
import { GetSoorahServiceProps } from '@/services/getSoorahService'
import { withMongo } from '@/utility/mongodb'

interface GetAyahServiceProps extends GetSoorahServiceProps {
  ayah: number
}

export type AyahResponseType = {
  id: string
  soorah: number
  ayah: number
  content: string
  content_latinized: string
  arabic: string
  transliteration: string
  juz: number
  prev: number | null
  next: number | null
}

export const getAyahService = async ({ soorah, ayah, translator }: GetAyahServiceProps) => {
  // Basic validation
  if (soorah < 1 || soorah > 114 || ayah < 1 || translator < 1) {
    throw new Error('Invalid input parameters')
  }

  const result = await withMongo(async (db: Db) => {
    const contentCollection = db.collection<DataPropsLatinized>('quranaz')

    // Get content and adjacent ayahs in parallel
    const [content, prevAndNext] = await Promise.all([
      contentCollection.findOne(
        { soorah, ayah, translator },
        {
          projection: {
            metadata_id: 1,
            _id: 0,
            id: 1,
            soorah: 1,
            ayah: 1,
            translator: 1,
            content: 1,
            content_latinized: 1,
          },
        }
      ),
      contentCollection
        .find(
          { soorah, ayah: { $in: [ayah - 1, ayah + 1] }, translator },
          { projection: { ayah: 1 } }
        )
        .toArray()
    ])

    if (!content) {
      throw new Error(`Ayah not found: soorah: ${soorah}, ayah: ${ayah}, translator: ${translator}`)
    }

    const metadata = await db
      .collection('metadata')
      .findOne(
        { _id: content.metadata_id },
        { projection: { content: 1, transliteration: 1, juz: 1 } }
      )

    if (!metadata) {
      throw new Error('Metadata not found')
    }

    const prev = prevAndNext.find((item) => item.ayah === ayah - 1)?.ayah || null
    const next = prevAndNext.find((item) => item.ayah === ayah + 1)?.ayah || null

    return {
      ...content,
      arabic: metadata.content,
      transliteration: metadata.transliteration,
      juz: metadata.juz,
      prev,
      next,
    }
  })

  return result
}
