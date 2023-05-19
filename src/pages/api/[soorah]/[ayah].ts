import { NextApiRequest, NextApiResponse } from 'next'

import { getAyahService } from '@/lib/getAyah'
import { ResponseData } from 'src/lib/db-types'
import { FormProps } from 'src/lib/types'

export type AyahResponseType = {
  id: string
  soorah: number
  ayah: number
  content: string
  content_latinized: string
  arabic: string
  transliteration: string
  juz: number
  prev: number | null
  next: number | null
}

export type ReponseProps = {
  out?: AyahResponseType
  data?: FormProps
} & ResponseData

const handler = async (
  { query, method }: Pick<NextApiRequest, 'query' | 'method'>,
  res: NextApiResponse<ReponseProps>
) => {
  const soorah = Number(query.soorah?.toString())
  const ayah = Number(query.ayah?.toString())
  const translator = Number(query.t?.toString() || process.env.NEXT_PUBLIC_DEFAULT_TRANSLATOR)

  try {
    if (method !== 'GET') {
      throw new Error('Method is not allowed')
    }

    const { out, data } = JSON.parse(await getAyahService({ soorah, ayah, translator }))

    return res.json({ out, data, success: true })
  } catch (error) {
    res.status(404).json({ success: false, error: String(error) })
  }
}

// eslint-disable-next-line import/no-default-export
export default handler
