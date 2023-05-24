import { Db } from 'mongodb'

import { withMongo } from '../utility/mongodb'

import { DataPropsLatinized } from './db-types'

export interface GetSoorahServiceProps {
  soorah: number
  translator: number
}

export const getSoorahService = async ({ soorah, translator }: GetSoorahServiceProps) => {
  const out = await withMongo(async (db: Db) => {
    const collection = db.collection<DataPropsLatinized>('quranaz')
    return await collection
      .find({ soorah, translator })
      .sort(['soorah', 'ayah'])
      .toArray()
  })

  if (!out) {
    throw new Error(`Soorah not found: { soorah: ${soorah}, translation: ${translator}}`)
  }

  return JSON.stringify({ out })
}