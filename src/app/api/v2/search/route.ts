import { NextResponse } from 'next/server'

import { Db } from 'mongodb'

import { DataPropsLatinized, DisplayData, ResponseErrorType } from '@/helpers/types'
import { getView } from '@/utility/getView/getView'
import type { FormProps } from '@/utility/getView/getView.types'
import { withMongo } from '@/utility/mongodb'
import { initialPaginate } from '@/utility/paginate'

export type ResponseProps = {
  out: DisplayData[]
  data?: FormProps
  paginate?: {
    total: number
    perPage: number
    currentPage: number
  }
}

const REGEX_SANITIZE = /[-\/\\^$*+?.()|[\]{}]/g
const REGEX_DIACRITICS = /[\u0300-\u036f]/g

export const POST = async (req: Request) => {
  try {
    const content = await req.json()

    const { search: searchParam, page, t } = content

    const query = searchParam
      ?.toString()
      .replace(REGEX_SANITIZE, '\\$&')
      .normalize('NFD')
      .replace(REGEX_DIACRITICS, '')
      .trim() as string

    if (!query) {
      return NextResponse.json({ error: 'Search query is required' }, { status: 400 })
    }

    const currentPage = Number(page?.toString()) || 1
    const translator = Number(t?.toString() || process.env.DEFAULT_TRANSLATOR)

    const limit = initialPaginate.perPage
    const skip = (currentPage - 1) * limit

    const data = getView({
      query,
      translator,
    })

    let ayahsCount = 0

    const ayahs = await withMongo(async (db: Db) => {
      const collection = db.collection<DataPropsLatinized>('quranaz')

      if (!data.query) return [] // very rare edge case

      const searchQuery = {
        content_latinized: { $regex: data.query, $options: 'i' },
        translator: data.translator,
      }

      ayahsCount = await collection.countDocuments(searchQuery)

      const result = await collection
        .find(searchQuery, { projection: { _id: 0 } })
        .sort({ soorah: 1, ayah: 1 }) // Sort by soorah in ascending order, then by ayah in ascending order
        .skip(skip)
        .limit(limit)
        .toArray()

      return result
    })

    if (ayahs.length === 0) {
      return NextResponse.json<ResponseErrorType>(
        {
          out: null,
          error: 'No results found for the given search query.',
        },
        { status: 200 }
      )
    }

    return NextResponse.json<ResponseProps>(
      {
        out: ayahs,
        data,
        paginate: {
          ...initialPaginate,
          total: ayahsCount,
          currentPage,
        },
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    )
  } catch (error) {
     
    console.error(error)
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
