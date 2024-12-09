export const enum ViewProps {
  EMPTY = 'empty',
  SOORAH = 'soorah',
  AYAH = 'ayah',
  SEARCH = 'search',
}

type EmptyState = {
  view: ViewProps.EMPTY
  s: null
  a: null
  q: null
  t: number
}

type SoorahState = {
  view: ViewProps.SOORAH
  s: number
  a: null
  q: null
  t: number
}

type AyahState = {
  view: ViewProps.AYAH
  s: number
  a: number
  q: null
  t: number
}

type SearchState = {
  view: ViewProps.SEARCH
  s: null
  a: null
  q: string
  t: number
}

export type FormProps = EmptyState | SoorahState | AyahState | SearchState
