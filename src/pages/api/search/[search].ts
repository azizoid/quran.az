import { Db } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

import { DataPropsLatinized, ResponseData } from 'src/lib/db-types'
import { withMongo } from 'src/lib/mongodb'
import { DisplayData, FormProps } from 'src/lib/types'
import { initialPaginate, paginate, getView } from 'src/utility'

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
  const search_query = query.search
    ?.toString()
    .replace(/[-/\^$*+?.()|[]{}]/g, '$&')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
  const currentPage = Number(query.page?.toString()) || 1
  const translator = Number(query.t?.toString() || process.env.DEFAULT_TRANSLATOR)

  const data = getView({ q: search_query, t: translator })

  try {
    if (method !== 'GET') {
      throw new Error('Phrase not found')
    }

    const ayahs = await withMongo(async (db: Db) => {
      const collection = db.collection<DataPropsLatinized>('quranaz')
      return await collection
        .find(
          {
            content_latinized: new RegExp(data.q, 'i'),
            translator: data.t,
          },
          {}
        )
        .sort(['soorah', 'aya'])
        .toArray()
    })

    if (!ayahs.length) {
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
    res.status(404).json({ success: false, error: String(error) })
  }
}

// eslint-disable-next-line import/no-default-export
export default handler
