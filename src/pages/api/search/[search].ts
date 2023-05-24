import { Db } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

import { DataPropsLatinized, ResponseData } from 'src/lib/db-types'
import { DisplayData, FormProps } from 'src/lib/types'
import { initialPaginate, paginate, getView } from 'src/utility'
import { withMongo } from 'src/utility/mongodb'

export type ReponseProps = ResponseData & {
  out: DisplayData[]
  data?: FormProps
  paginate: {
    total: number
    perPage: number
    currentPage: number
  }
}

const handler = async (
  { query, method }: Pick<NextApiRequest, 'query' | 'method'>,
  res: NextApiResponse<ReponseProps | ResponseData>
) => {
  try {
    if (method !== 'GET') {
      throw new Error('Phrase not found')
    }

    const search_query = query.search
      ?.toString()
      .replace(/[^\w\s.,\-!?"']/g, '')
      .replace(/\s+/g, ' ')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()

    const currentPage = Number(query.page?.toString()) || 1
    const translator = Number(query.t?.toString() || process.env.DEFAULT_TRANSLATOR)

    const data = getView({ q: search_query, t: translator })

    const ayahs = await withMongo(async (db: Db) => {
      const collection = db.collection<DataPropsLatinized>('quranaz')
      return await collection
        .find(
          {
            content_latinized: data.q ? new RegExp(data.q, 'i') : undefined,
            translator: data.t,
          },
          {}
        )
        .sort({ soorah: 1, ayah: 1 }) // Sort by soorah in ascending order, then by ayah in ascending order
        .toArray()
    })

    if (ayahs.length === 0) {
      throw new Error('Not found')
    }

    const out = paginate(ayahs, initialPaginate.perPage, currentPage).map(
      ({ _id, soorah, ayah, content, translator: translatorId }) => ({
        id: _id,
        soorah,
        ayah,
        content,
        translator: translatorId,
      })
    )

    return res.json({
      out,
      data,
      paginate: {
        ...initialPaginate,
        total: ayahs.length,
        currentPage,
      },
      success: out.length > 0,
    })
  } catch (error) {
    return res.status(404).json({ success: false, error: String(error) })
  }
}

export default handler