type EmptyState = {
  view: 'empty'
  s: null
  a: null
  q: null
  t: number
}

type SoorahState = {
  view: 'soorah'
  s: number
  a: null
  q: null
  t: number
}

type AyahState = {
  view: 'ayah'
  s: number
  a: number
  q: null
  t: number
}

type SearchState = {
  view: 'search'
  s: null
  a: null
  q: string
  t: number
}

export type FormProps = EmptyState | SoorahState | AyahState | SearchState
