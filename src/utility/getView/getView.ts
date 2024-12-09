import { soorahList } from '@/assets/soorah-list-object'
import { TRANSLATOR_LIST } from '@/assets/translatorList'

import { FormProps, ViewProps } from './getView.types'

const DEFAULT_TRANSLATOR = Number(process.env.NEXT_PUBLIC_DEFAULT_TRANSLATOR)

export const initialStateProps: FormProps = {
  s: null,
  a: null,
  q: null,
  view: ViewProps.EMPTY,
  t: DEFAULT_TRANSLATOR,
}

type FormInputProps = {
  s: number | null
  a: number | null
  q: string | null
  t: number | null
}

export const getView = (form: Partial<FormInputProps> = initialStateProps): FormProps => {
  const result = { ...initialStateProps } as FormProps

  if (form.s) {
    const soorah = soorahList.find(({ id }) => id === form.s)

    if (soorah) {
      result.s = soorah.id
      result.view = ViewProps.SOORAH

      if (form.a && form.a > 0 && form.a <= soorah.ayahCount) {
        result.a = form.a
        result.view = ViewProps.AYAH
      }
    }
  } else if (form.q && form.q.length > 2) {
    result.q = form.q
    result.view = ViewProps.SEARCH
  }

  if (form?.t && form.t < TRANSLATOR_LIST.length) {
    result.t = form.t
  }

  return result
}
