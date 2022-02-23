import Cors from 'cors'
import { NextApiRequest, NextApiResponse } from 'next'

export const cors = Cors({
  methods: ['GET'],
})

export function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn = cors
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}
