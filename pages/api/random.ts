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
  switch (req.method) {
    case 'GET':
      try {
        await runMiddleware(req, res)

        const random = await withMongo(async (db: Db) => {
          const collection = db
            .collection<DataPropsLatinized>('quranaz')
            .aggregate([
              {
                $sample: { size: 1 },
                // $match: { translator: Number(process.env.DEFAULT_TRANSLATOR) },
              },
            ])
            .toArray()
          return collection.then((data) => ({
            id: data[0].id,
            soorah: data[0].soorah,
            ayah: data[0].ayah,
            content: data[0].content,
            content_latinized: data[0].content_latinized,
            translator: data[0].translator,
          }))
        })

        return res.json({ out: random, success: true })
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
