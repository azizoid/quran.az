import { Db } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

import { DataPropsLatinized, ResponseData } from 'src/lib/db-types'
import { withMongo } from 'src/lib/mongodb'
import { DisplayData } from 'src/lib/types'
import { runMiddleware } from 'src/utility'

export type ResponseProps = {
  out?: DisplayData
}

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseProps | ResponseData>) => {
  try {
    await runMiddleware(req, res)

    if (req.method !== 'GET') {
      throw new Error('Invalid method')
    }

    const randomAyah = await withMongo(async (db: Db) => {
      const pipeline = [{ $sample: { size: 1 } }]
      const collection = db.collection<DataPropsLatinized>('quranaz')
      return await collection.aggregate(pipeline).next()
    })

    if (!randomAyah) {
      throw new Error('No random ayah found')
    }

    const { id, soorah, ayah, content, content_latinized, translator } = randomAyah

    return res.json({ out: { id, soorah, ayah, content, content_latinized, translator }, success: true })
  } catch (error) {
    return res.status(400).json({ success: false })
  }
}

export default handler
