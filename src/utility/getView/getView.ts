import { soorahList } from '@/assets/soorah-list-object'
import { TRANSLATOR_LIST } from 'src/assets/translatorList'
import { FormProps } from 'src/lib/types'

const DEFAULT_TRANSLATOR = Number(process.env.NEXT_PUBLIC_DEFAULT_TRANSLATOR)

const initialStateProps: FormProps = {
  s: 0,
  a: '',
  q: '',
  view: 'empty',
  t: DEFAULT_TRANSLATOR,
}

export const getView = (form: Partial<FormProps>): FormProps => {
  const result: Partial<FormProps> = {}

  const soorah = soorahList.find(({ id }) => id === form.s)

  if (form?.s && soorah) {
    result.s = soorah.id
    result.view = 'soorah'

    if (form?.a && form.a > 0 && form.a <= soorah.ayahCount) {
      result.a = form.a
      result.view = 'ayah'
    }
  } else if (form?.q && form.q.length > 2) {
    result.q = form.q
    result.view = 'search'
  }

  if (form?.t && form.t < TRANSLATOR_LIST.length) {
    result.t = form.t
  }

  return { ...initialStateProps, ...result }
}
