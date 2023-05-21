import { Db } from 'mongodb'

import { GetSoorahServiceProps } from './getSoorah'
import { withMongo } from './mongodb'

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
  const out = await withMongo(async (db: Db) => {
    const contentCollection = db.collection('quranaz')

    const content = await contentCollection
      .aggregate<AyahResponseType>([
        {
          $match: {
            soorah,
            ayah,
            translator,
          },
        },
        {
          $lookup: {
            from: 'metadata',
            localField: 'metadata_id',
            foreignField: '_id',
            as: 'metadata',
          },
        },
        {
          $unwind: '$metadata',
        },
        {
          $project: {
            _id: 1,
            id: 1,
            soorah: 1,
            ayah: 1,
            translator: 1,
            content: 1,
            content_latinized: 1,
            arabic: '$metadata.content',
            transliteration: '$metadata.transliteration',
            juz: '$metadata.juz',
          },
        },
      ])
      .next()

    if (!content) {
      throw new Error(`Ayah not found: soorah: ${soorah}, ayah: ${ayah}, translator: ${translator}`)
    }

    const prevAyah = Number(ayah) - 1
    const nextAyah = Number(ayah) + 1

    const prevAndNext = await contentCollection
      .find<{ ayah: number }>(
        {
          soorah,
          ayah: { $in: [prevAyah, nextAyah] },
          translator,
        },
        { projection: { ayah: 1, _id: 0 } }
      )
      .toArray()

    const prev = prevAndNext.find((item) => item.ayah === prevAyah)?.ayah || null
    const next = prevAndNext.find((item) => item.ayah === nextAyah)?.ayah || null

    return { ...content, prev, next }
  })

  return JSON.stringify({ out })
}