import { TRANSLATOR_LIST } from 'src/assets/translatorList'
import { FormProps } from 'src/lib/types'

export const initialStateProps: FormProps = {
  s: 0,
  a: '',
  q: '',
  view: 'empty',
  t: Number(process.env.NEXT_PUBLIC_DEFAULT_TRANSLATOR),
}

export const getView = (form: Partial<FormProps>): FormProps => {
  const result = {} as FormProps

  if (form?.s && form.s > 0 && form.s < 115) {
    result.s = form.s
    result.view = 'soorah'

    if (form?.a && form.a > 0 && form.a < 287) {
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
