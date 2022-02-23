import { NextApiRequest, NextApiResponse } from 'next'
import { Db } from 'mongodb'
import { withMongo } from '../../../lib/mongodb'
import { DataPropsLatinized, ResponseData } from '../../../lib/db-types'
import { initialPaginate, paginate } from '../../../utility/paginate/paginate'
import { DisplayData, FormProps } from '../../../lib/types'
import { getView } from '../../../utility/getView/getView'

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
  req: NextApiRequest,
  res: NextApiResponse<ReponseProps | ResponseData>
) => {
  const { query, method } = req

  const search_query = query.search
    .toString()
    .replace(/[-/\^$*+?.()|[]{}]/g, '$&')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
  const currentPage = Number(query.page?.toString()) || 1
  const translator = Number(
    query.t?.toString() || process.env.DEFAULT_TRANSLATOR
  )

  const data = getView({ q: search_query, t: translator })

  switch (method) {
    case 'GET':
      try {
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
        const out = paginate(ayahs, initialPaginate.perPage, currentPage).map(
          ({ _id, soorah, ayah, content, translator }) => ({
            id: _id,
            soorah,
            ayah,
            content,
            translator,
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
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
export default handler
