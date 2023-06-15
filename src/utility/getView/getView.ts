import { soorahList } from '@/assets/soorah-list-object'
import { TRANSLATOR_LIST } from '@/assets/translatorList'

const DEFAULT_TRANSLATOR = Number(process.env.NEXT_PUBLIC_DEFAULT_TRANSLATOR)

export type FormProps = {
  view: 'empty'
  s: null
  a: null
  q: null
  t: number
} | {
  view: 'soorah'
  s: number
  a: null
  q: null
  t: number
} | {
  view: 'ayah'
  s: number
  a: number
  q: null
  t: number
} | {
  view: 'search'
  s: null
  a: null
  q: string
  t: number
}

const initialStateProps: FormProps = {
  s: null,
  a: null,
  q: null,
  view: 'empty',
  t: DEFAULT_TRANSLATOR,
}

type FormInputProps = {
  s: number | null
  a: number | null
  q: string | null
  t: number | null
}

export const getView = (form: Partial<FormInputProps> = initialStateProps): FormProps => {
  const result = {} as FormProps

  if (form.s) {
    const soorah = soorahList.find(({ id }) => id === form.s)

    if (soorah) {
      result.s = soorah.id
      result.view = 'soorah'

      if (form.a && form.a > 0 && form.a <= soorah.ayahCount) {
        result.a = form.a
        result.view = 'ayah'
      }
    }
  } else if (form.q && form.q.length > 2) {
    result.q = form.q
    result.view = 'search'
  }

  if (form?.t && form.t < TRANSLATOR_LIST.length) {
    result.t = form.t
  }

  return { ...initialStateProps, ...result }
}
