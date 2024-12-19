import { soorahList } from '@/assets/soorah-list-object'
import { TRANSLATOR_LIST } from '@/assets/translatorList'

import { FormProps, ViewProps } from './getView.types'

const DEFAULT_TRANSLATOR = Number(process.env.NEXT_PUBLIC_DEFAULT_TRANSLATOR)

export const initialStateProps: FormProps = {
  soorah: null,
  ayah: null,
  query: null,
  view: ViewProps.EMPTY,
  translator: DEFAULT_TRANSLATOR,
}

export const getView = (form: Partial<Omit<FormProps, 'view'>> = initialStateProps): FormProps => {
  const result = { ...initialStateProps } as FormProps

  if (form.soorah) {
    const soorah = soorahList.find(({ id }) => id === form.soorah)

    if (soorah) {
      result.soorah = soorah.id
      result.view = ViewProps.SOORAH

      if (form.ayah && form.ayah > 0 && form.ayah <= soorah.ayahCount) {
        result.ayah = form.ayah
        result.view = ViewProps.AYAH
      }
    }
  } else if (form.query && form.query.length > 2) {
    result.query = form.query
    result.view = ViewProps.QUERY
  }

  if (form?.translator && form.translator < TRANSLATOR_LIST.length) {
    result.translator = form.translator
  }

  return result
}
