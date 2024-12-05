import { create } from 'zustand'

import { getView } from '@/utility/getView/getView'
import { ViewProps } from '@/utility/getView/getView.types'

type SearchFormState = {
  soorah: number | null
  ayah: number | null
  query: string | null
  translator: number
  view: ViewProps
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
  view: ViewProps.EMPTY,

  // Actions
  setSoorah: (value) =>
    set({
      soorah: value,
      ayah: null,
      query: null,
      view: ViewProps.SOORAH,
    }),
  setAyah: (value) =>
    set((state) => ({
      ...state,
      ayah: value,
      query: null,
      view: ViewProps.AYAH,
    })),
  setQuery: (value) =>
    set({
      soorah: null,
      ayah: null,
      query: value,
      view: ViewProps.SEARCH,
    }),
  setTranslator: (value) =>
    set((state) => ({
      ...state,
      translator: value,
    })),

  // Batch state initialization
  initializeState: (initState) =>
    set((state) => {
      const generatedState = getView({
        s: initState.soorah,
        a: initState.ayah,
        q: initState.query,
        t: initState.translator,
      })

      return {
        ...state,
        soorah: generatedState.s,
        ayah: generatedState.a,
        query: generatedState.q,
        translator: generatedState.t,
        view: generatedState.view,
      }
    }),
}))
