import { Db } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

import { ResponseData } from 'src/lib/db-types'
import { withMongo } from 'src/lib/mongodb'
import { FormProps } from 'src/lib/types'
import { getView } from 'src/utility'

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

export type ReponseProps = {
  out?: AyahResponseType
  data?: FormProps
} & ResponseData

const handler = async (
  { query, method }: Pick<NextApiRequest, 'query' | 'method'>,
  res: NextApiResponse<ReponseProps>
) => {
  const soorah = Number(query.soorah.toString())
  const ayah = Number(query.ayah.toString())
  const translator = Number(query.t?.toString() || process.env.DEFAULT_TRANSLATOR)
  const data = getView({ s: soorah, a: ayah, t: translator })

  try {
    if (method !== 'GET' || data.view === 'empty') {
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

    return res.json({ out, data, success: true })
  } catch (error) {
    res.status(404).json({ success: false, error: String(error) })
  }
}

// eslint-disable-next-line import/no-default-export
export default handler
