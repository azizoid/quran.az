import * as Sentry from '@sentry/node'

import { Db } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

import { DisplayData, FormProps, DataPropsLatinized, ResponseData } from '@/lib/types'
import { initialPaginate, getView } from '@/utility'

import { withMongo } from '@/utility/mongodb'

export type ReponseProps = ResponseData & {
  out: DisplayData[]
  data?: FormProps
  paginate: {
    total: number
    perPage: number
    currentPage: number
  }
}

const REGEX_SANITIZE = /[-\/\\^$*+?.()|[\]{}]/g
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
        .replace(REGEX_SANITIZE, '\\$&')
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

    const limit = initialPaginate.perPage
    const skip = (currentPage - 1) * limit

    const data = getView({
      q: search_query,
      t: translator
    })

    let ayahsCount = 0

    const ayahs = await withMongo(async (db: Db) => {
      const collection = db.collection<DataPropsLatinized>('quranaz')

      if (!data.q) return [] // very rare edge case

      const searchQuery = {
        content_latinized: { '$regex': data.q, '$options': 'i' },
        translator: data.t,
      }

      ayahsCount = await collection.countDocuments(searchQuery)

      const result = await collection
        .find(searchQuery)
        .sort({ soorah: 1, ayah: 1 }) // Sort by soorah in ascending order, then by ayah in ascending order
        .skip(skip)
        .limit(limit)
        .toArray()

      return result
    })

    if (ayahs.length === 0) {
      return res.status(200).json({
        success: false,
        error: 'No results found for the given search query.',
      })
    }

    res.setHeader('Cache-Control', 'no-store')

    return res.json({
      out: ayahs,
      data,
      paginate: {
        ...initialPaginate,
        total: ayahsCount,
        currentPage,
      },
      success: true,
    })
  } catch (error) {
    Sentry.captureException(error)
    return res.status(500).json({
      success: false,
      error: (error as Error).message || 'An unexpected error occurred'
    })
  }
}

export default handler
