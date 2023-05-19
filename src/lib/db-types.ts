import { FormProps } from './types'

export type ResponseData = { success: boolean; error?: string }

export type DataProps = {
  _id: string
  detail_id: number
  soorah_id: number
  aya_id: number
  content: string
  translator_id: number
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
}
