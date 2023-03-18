import { NextApiRequest, NextApiResponse } from 'next'
import { Db } from 'mongodb'
import { withMongo } from '@/lib/mongodb'
import { ResponseData } from '@/lib/db-types'
import { FormProps } from '@/lib/types'
import { getView } from '@/utility'

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

  if (data.view === 'empty') {
    return res.status(400).json({ success: false })
  }

  switch (method) {
    case 'GET':
      try {
        const out = await withMongo(async (db: Db) => {
          const contentCollection = db.collection('quranaz');

          const content = await contentCollection.aggregate<AyahResponseType>([
            {
              $match: {
                soorah: Number(data.s),
                ayah: Number(data.a),
                translator: data.t
              }
            },
            {
              $lookup: {
                from: 'metadata',
                localField: 'metadata_id',
                foreignField: '_id',
                as: 'metadata'
              }
            },
            {
              $unwind: '$metadata'
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
                juz: '$metadata.juz'
              }
            }
          ]).next();

          const prevAyah = Number(data.a) - 1
          const nextAyah = Number(data.a) + 1

          const prevAndNext = await contentCollection.find<{ ayah: number }>({
            soorah: data.s,
            ayah: { $in: [prevAyah, nextAyah] },
            translator: data.t,
          }, { projection: { ayah: 1, _id: 0 } }).toArray()

          const prev = prevAndNext.find((item) => item.ayah === prevAyah)?.ayah || null
          const next = prevAndNext.find((item) => item.ayah === nextAyah)?.ayah || null

          return { ...content, prev, next }
        })

        return res.json({ out, data, success: true })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}

// eslint-disable-next-line import/no-default-export
export default handler
