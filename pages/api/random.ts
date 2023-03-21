import { NextApiRequest, NextApiResponse } from 'next'
import { Db } from 'mongodb'
import { DisplayData } from '@/lib/types'
import { DataPropsLatinized, ResponseData } from '@/lib/db-types'
import { withMongo } from '@/lib/mongodb'
import { runMiddleware } from '@/utility'

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
      const pipeline = [
        { $sample: { size: 1 } }
      ];

      const { id, soorah, ayah, content, content_latinized, translator } = await db
        .collection<DataPropsLatinized>('quranaz')
        .aggregate(pipeline).next();

      // if (!collection) {
      //   throw new Error()
      // }



      return { id, soorah, ayah, content, content_latinized, translator }
    })

    return res.json({ out: random, success: true })
  } catch (error) {
    res.status(400).json({ success: false })
  }

}
// eslint-disable-next-line import/no-default-export
export default handler
