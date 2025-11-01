'use server-only'

import type { Db } from 'mongodb'

import type { DataPropsLatinized } from '@/helpers/types'
import { withMongo } from '@/utility/mongodb'

export interface GetSoorahServiceProps {
  soorah: number
  translator: number
}

export const getSoorahService = async ({ soorah, translator }: GetSoorahServiceProps) => {
  // Basic validation
  if (soorah < 1 || soorah > 114 || translator < 1) {
    throw new Error('Invalid soorah or translator number')
  }

  const out = await withMongo(async (db: Db) => {
    const collection = db.collection<DataPropsLatinized>('quranaz')

    // Use findOne to check if soorah exists first
    const exists = await collection.findOne({ soorah, translator }, { projection: { _id: 1 } })

    if (!exists) {
      throw new Error(`Soorah not found: { soorah: ${soorah}, translation: ${translator}}`)
    }

    // Then fetch all ayahs with optimized projection
    return await collection
      .find(
        { soorah, translator },
        {
          projection: {
            _id: 0,
            content_latinized: 0,
            metadata_id: 0,
            translator: 0, // Since it's the same for all ayahs
          },
        }
      )
      .sort({ ayah: 1 }) // Use numeric sort for better performance
      .toArray()
  })

  return out
}
