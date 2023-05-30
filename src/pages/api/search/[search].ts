import * as Sentry from '@sentry/node'

import { Db } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

import { DisplayData, FormProps, DataPropsLatinized, ResponseData } from '@/lib/types'
import { initialPaginate, paginate, getView } from '@/utility'
import { withMongo } from 'src/utility/mongodb'

export type ReponseProps = ResponseData & {
  out: DisplayData[]
  data?: FormProps
  paginate: {
    total: number
    perPage: number
    currentPage: number
  }
}

const REGEX_CLEAN = /[^\w\s.,\(\)çğıöşüâəÇĞIÖŞÜÂƏа-яА-ЯёЁ]/g
const REGEX_SPACES = /\s+/g
const REGEX_DIACRITICS = /[\u0300-\u036f]/g

const handler = async (
  { query, method }: Pick<NextApiRequest, 'query' | 'method'>,
  res: NextApiResponse<ReponseProps | ResponseData>
) => {
  try {
    if (method !== 'GET') {
      return res.status(405).json({ success: false, error: 'Method not allowed' }) // 405 Method Not Allowed
    }

    let search_query = query.search ? query.search.toString() : ''

    if (search_query) {
      search_query = search_query
        .replace(REGEX_CLEAN, '')
        .replace(REGEX_SPACES, ' ')
        .normalize('NFD')
        .replace(REGEX_DIACRITICS, '')
        .trim()
    }

    if (!search_query) {
      return res.status(400).json({
        success: false,
        error: 'Search query is required'
      }) // 400 Bad Request
    }

    const currentPage = Number(query.page?.toString()) || 1
    const translator = Number(query.t?.toString() || process.env.DEFAULT_TRANSLATOR)

    const data = getView({
      q: search_query,
      t: translator
    })

    const ayahs = await withMongo(async (db: Db) => {
      const collection = db.collection<DataPropsLatinized>('quranaz')
      const ayahsCount = await collection.countDocuments(
        {
          content_latinized: data.q ? new RegExp(data.q, 'i') : undefined,
          translator: data.t,
        }
      )

      if (ayahsCount === 0) {
        return []
      }

      return await collection
        .find(
          {
            content_latinized: data.q ? new RegExp(data.q, 'i') : undefined,
            translator: data.t,
          }
        )
        .sort({ soorah: 1, ayah: 1 }) // Sort by soorah in ascending order, then by ayah in ascending order
        .toArray()
    })

    if (ayahs.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Not found'
      }) // 404 Not Found
    }

    const out = paginate(ayahs, initialPaginate.perPage, currentPage).map(
      ({ _id, soorah, ayah, content, translator: translatorId }) => ({
        id: _id,
        soorah,
        ayah,
        content,
        translator: translatorId,
      })
    )

    return res.json({
      out,
      data,
      paginate: {
        ...initialPaginate,
        total: ayahs.length,
        currentPage,
      },
      success: out.length > 0,
    })
  } catch (error) {
    Sentry.captureException(error)
    return res.status(500).json({ success: false, error: String(error) }) // 500 Internal Server Error
  }
}

export default handler
