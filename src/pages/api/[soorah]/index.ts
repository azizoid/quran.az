import { Db } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

import { DataPropsLatinized, ResponseData } from 'src/lib/db-types'
import { withMongo } from 'src/lib/mongodb'
import { FormProps } from 'src/lib/types'
import { DisplayData } from 'src/lib/types'
import { getView } from 'src/utility'

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

  try {
    if (method !== 'GET' || data.view === 'empty') {
      throw new Error('Soorah not found')
    }

    const out = await withMongo(async (db: Db) => {
      const collection = db.collection<DataPropsLatinized>('quranaz')
      return await collection
        .find({ soorah: data.s, translator: data.t })
        .sort(['soorah', 'ayah'])
        .toArray()
    })

    return res.json({ out, data, success: true })
  } catch (error) {
    res.status(404).json({ success: false, error: String(error) })
  }
}

// eslint-disable-next-line import/no-default-export
export default handler
