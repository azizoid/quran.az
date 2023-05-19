import { Db } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

import { getSoorahService } from '@/lib/getSoorah'
import { ResponseData } from 'src/lib/db-types'
import { FormProps } from 'src/lib/types'
import { DisplayData } from 'src/lib/types'

export type ReponseProps = {
  out?: DisplayData[]
  data?: FormProps
} & ResponseData

const handler = async (
  { query, method }: Pick<NextApiRequest, 'query' | 'method'>,
  res: NextApiResponse<ReponseProps>
) => {
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=86400')

  const soorah = Number(query.soorah?.toString())
  const translator = Number(query.t?.toString() || process.env.NEXT_PUBLIC_DEFAULT_TRANSLATOR)

  try {
    if (method !== 'GET') {
      throw new Error('Method is not allowed')
    }

    const { out, data } = JSON.parse(await getSoorahService({ soorah, translator }))

    return res.json({ out, data, success: true })
  } catch (error) {
    res.status(404).json({ success: false, error: String(error) })
  }
}

// eslint-disable-next-line import/no-default-export
export default handler
