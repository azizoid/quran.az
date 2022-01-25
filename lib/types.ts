export type FormSoorahProp = number
export type FormAyahProp = number | ""
export type FormQueryProp = string | undefined
export type FormViewProp = "init" | "empty" | "soorah" | "ayah" | "search"
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
  soorah: FormSoorahProp;
  ayah: number;
  content: string;
  content_latinized?: string;
  translator: FormTranslatorProp
}

export enum PageStates {
  INIT = "Initialization",
  EMPTY = "Page is empty",
  LOADING = "Loading...",

  SOORAH = "Soorah View",
  AYAH = "Ayah View",
  SEARCH = "Search View",

  NOT_FOUND = 'Not Found'
}
