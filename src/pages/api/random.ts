import * as Sentry from '@sentry/node' // Import Sentry

import { Db } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

import { DataPropsLatinized, ResponseData, DisplayData } from '@/lib/types'
import { runMiddleware } from '@/utility/cors'
import { withMongo } from '@/utility/mongodb'

export type ResponseProps = {
  out?: DisplayData
}

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseProps | ResponseData>) => {
  try {
    await runMiddleware(req, res)

    if (req.method !== 'GET') {
      return res.status(405).json({ success: false, error: 'Invalid method' }) // 405 Method Not Allowed
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
    Sentry.captureException(error)
    return res.status(500).json({ success: false, error: String(error) }) // 500 Internal Server Error
  }
}

export default handler