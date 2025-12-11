import type { Db } from 'mongodb'
import { NextResponse } from 'next/server'

import type { DataPropsLatinized } from '@/helpers/types'
import { withMongo } from '@/utility/mongodb'

// Cache duration in seconds
const CACHE_DURATION = 3600 // 1 hour

export const GET = async () => {
  try {
    const randomAyah = await withMongo(async (db: Db) => {
      const pipeline = [{ $sample: { size: 1 } }]
      const collection = db.collection<DataPropsLatinized>('quranaz')
      return await collection.aggregate(pipeline).next()
    })

    if (!randomAyah) {
      return NextResponse.json(
        { error: 'No random ayah found' },
        {
          status: 404,
          headers: {
            'Cache-Control': 'no-store',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
        }
      )
    }

    const { id, soorah, ayah, content, content_latinized, translator } = randomAyah

    return NextResponse.json(
      { id, soorah, ayah, content, content_latinized, translator },
      {
        status: 200,
        headers: {
          'Cache-Control': `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate=${CACHE_DURATION * 2}`,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    )
  } catch (error) {
    console.error('Random ayah API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    )
  }
}
