export const enum ViewProps {
  EMPTY = 'empty',
  SOORAH = 'soorah',
  AYAH = 'ayah',
  QUERY = 'query',
}

type EmptyState = {
  view: ViewProps.EMPTY
  soorah: null
  ayah: null
  query: null
  translator: number
}

type SoorahState = {
  view: ViewProps.SOORAH
  soorah: number
  ayah: null
  query: null
  translator: number
}

type AyahState = {
  view: ViewProps.AYAH
  soorah: number
  ayah: number
  query: null
  translator: number
}

type SearchState = {
  view: ViewProps.QUERY
  soorah: null
  ayah: null
  query: string
  translator: number
}

export type FormProps = EmptyState | SoorahState | AyahState | SearchState
