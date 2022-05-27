import { NextApiRequest, NextApiResponse } from 'next'
import { Db } from 'mongodb'
import { withMongo } from '@/lib/mongodb'
import { FormProps } from '@/lib/types'

import { getView } from '@/utility'
import { DisplayData } from '@/lib/types'
import { DataPropsLatinized, ResponseData } from '@/lib/db-types'

export type ReponseProps = {
  out?: DisplayData[]
  data?: FormProps
} & ResponseData

const handler = async (
  { query, method }: Pick<NextApiRequest, 'query' | 'method'>,
  res: NextApiResponse<ReponseProps>
) => {
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=86400')

  const soorah = Number(query.soorah.toString())
  const translator = Number(query.t?.toString() || process.env.DEFAULT_TRANSLATOR)
  const data = getView({ s: soorah, t: translator })

  if (data.view === 'empty') {
    return res.status(400).json({ success: false })
  }

  switch (method) {
    case 'GET':
      try {
        const out = await withMongo(async (db: Db) => {
          const collection = db.collection<DataPropsLatinized>('quranaz')
          return await collection
            .find({ soorah: data.s, translator: data.t })
            .sort(['soorah', 'ayah'])
            .toArray()
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
