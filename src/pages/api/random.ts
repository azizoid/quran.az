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
      throw new Error()
    }

    const random = await withMongo(async (db: Db) => {
      const pipeline = [{ $sample: { size: 1 } }]

      const randomAyah = await db
        .collection('quranaz')
        .aggregate<DataPropsLatinized>(pipeline)
        .next()
        .catch((error) => {
          throw new Error(error)
        })

      const { id, soorah, ayah, content, content_latinized, translator } = randomAyah!

      return { id, soorah, ayah, content, content_latinized, translator }
    })

    return res.json({ out: random, success: true })
  } catch (error) {
    res.status(400).json({ success: false })
  }
}
// eslint-disable-next-line import/no-default-export
export default handler
