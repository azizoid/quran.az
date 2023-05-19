import { Db } from 'mongodb'

import { getView } from '@/utility'
import { AyahResponseType } from 'src/pages/api/[soorah]/[ayah]'

import { GetSoorahProps } from './getSoorah'
import { withMongo } from './mongodb'

interface GetAyahProps extends GetSoorahProps {
  ayah: number
}

export const getAyah = async ({ soorah, ayah, translator }: GetAyahProps) => {
  const data = getView({ s: soorah, a: ayah, t: translator })

  if (data.view === 'empty') {
    throw new Error('Ayah not found')
  }

  const out = await withMongo(async (db: Db) => {
    const contentCollection = db.collection('quranaz')

    const content = await contentCollection
      .aggregate<AyahResponseType>([
        {
          $match: {
            soorah: Number(data.s),
            ayah: Number(data.a),
            translator: data.t,
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
      throw new Error('Ayah not found')
    }

    const prevAyah = Number(data.a) - 1
    const nextAyah = Number(data.a) + 1

    const prevAndNext = await contentCollection
      .find<{ ayah: number }>(
        {
          soorah: data.s,
          ayah: { $in: [prevAyah, nextAyah] },
          translator: data.t,
        },
        { projection: { ayah: 1, _id: 0 } }
      )
      .toArray()

    const prev = prevAndNext.find((item) => item.ayah === prevAyah)?.ayah || null
    const next = prevAndNext.find((item) => item.ayah === nextAyah)?.ayah || null

    return { ...content, prev, next }
  })

  return JSON.stringify({ out, data })
}