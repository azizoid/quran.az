import { Db } from 'mongodb'

import { getView } from '@/utility'

import { DataPropsLatinized } from './db-types'
import { withMongo } from './mongodb'

export interface GetSoorahServiceProps {
  soorah: number
  translator: number
}

export const getSoorahService = async ({ soorah, translator }: GetSoorahServiceProps) => {
  const data = getView({ s: soorah, t: translator })

  if (data.view === 'empty') {
    throw new Error(`Soorah view is 'empty': { soorah: ${soorah}, translation: ${translator}}`)
  }

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

  return JSON.stringify({ out, data })
}