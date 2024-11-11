import { ObjectId } from 'mongodb'

export type DisplayData = {
  id: string
  soorah: number
  ayah: number
  content: string
  content_latinized?: string
  translator: number
}

export type DataPropsLatinized = {
  _id: string
  id: string
  detail_id: number
  soorah: number
  ayah: number
  content: string
  content_latinized: string
  translator: number
  metadata_id: ObjectId
}

export type ResponseErrorType = {
  out: null
  error: string
}
