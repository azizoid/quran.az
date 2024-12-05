import { create } from 'zustand'

type SearchFormState = {
  soorah: number | null
  ayah: number | null
  query: string | null
  translator: number
  view: string | null
}

type SearchFormActions = {
  setSoorah: (value: number) => void
  setAyah: (value: number) => void
  setQuery: (value: string) => void
  setTranslator: (value: number) => void
  initializeState: (initState: Omit<SearchFormState, 'view'>) => void
}

export const useSearchFormStore = create<SearchFormState & SearchFormActions>((set) => ({
  soorah: null,
  ayah: null,
  query: null,
  translator: 1,
  view: null,

  // Actions
  setSoorah: (value) =>
    set({
      soorah: value,
      ayah: null,
      query: null,
      view: 'soorah',
    }),
  setAyah: (value) =>
    set((state) => ({
      ...state,
      ayah: value,
      query: null,
      view: 'ayah',
    })),
  setQuery: (value) =>
    set({
      soorah: null,
      ayah: null,
      query: value,
      view: 'query',
    }),
  setTranslator: (value) =>
    set((state) => ({
      ...state,
      translator: value,
    })),

  // Batch state initialization
  initializeState: (initState) =>
    set((state) => ({
      ...state,
      ...initState,
    })),
}))
