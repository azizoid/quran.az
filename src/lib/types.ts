export type FormSoorahProp = number
export type FormAyahProp = number | ''
export type FormQueryProp = string | undefined
export type FormViewProp = 'empty' | 'soorah' | 'ayah' | 'search'
export type FormTranslatorProp = number

export type FormProps = {
  s: FormSoorahProp
  a: FormAyahProp
  q: FormQueryProp
  t: FormTranslatorProp
  view: FormViewProp
}

export type DisplayData = {
  id: string
  soorah: FormSoorahProp
  ayah: number
  content: string
  content_latinized?: string
  translator: FormTranslatorProp
}

export type ResponseData = {
  success: boolean
  error?: string
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
