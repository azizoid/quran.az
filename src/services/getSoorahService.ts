'use server-only'
import { Db } from 'mongodb'

import { DataPropsLatinized } from '@/helpers/types'
import { withMongo } from '@/utility/mongodb'

export interface GetSoorahServiceProps {
  soorah: number
  translator: number
}

export const getSoorahService = async ({ soorah, translator }: GetSoorahServiceProps) => {
  const out = await withMongo(async (db: Db) => {
    const collection = db.collection<DataPropsLatinized>('quranaz')
    return await collection
      .find(
        { soorah, translator },
        { projection: { _id: 0, content_latinized: 0, metadata_id: 0 } }
      )
      .sort(['soorah', 'ayah'])
      .toArray()
  })

  if (!out) {
    throw new Error(`Soorah not found: { soorah: ${soorah}, translation: ${translator}}`)
  }

  return out
}
