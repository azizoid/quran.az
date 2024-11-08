import { NextResponse } from 'next/server'

import { Db } from 'mongodb'

import { DataPropsLatinized } from '@/lib/types'
import { withMongo } from '@/utility/mongodb'

export const dynamic = 'force-dynamic'

export const GET = async () => {
  try {
    const randomAyah = await withMongo(async (db: Db) => {
      const pipeline = [{ $sample: { size: 1 } }]
      const collection = db.collection<DataPropsLatinized>('quranaz')
      return await collection.aggregate(pipeline).next()
    })

    if (!randomAyah) {
      throw new Error('No random ayah found')
    }

    const { id, soorah, ayah, content, content_latinized, translator } = randomAyah

    return NextResponse.json(
      { id, soorah, ayah, content, content_latinized, translator },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    )
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
