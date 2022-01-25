import { FormProps } from "../../lib/types"

export const initialStateProps: FormProps = {
  s: 0,
  a: "",
  q: "",
  view: "init",
  t: Number(process.env.DEFAULT_TRANSLATOR),
}

export const getView = (form: Partial<FormProps>): FormProps => {
  if (form.s && form.s > 0 && form.s < 115) {
    form.view = "soorah"

    if (form.a > 0 && form.a < 287) {
      form.view = "ayah"
    }
  } else if (form?.q?.length > 2) {
    form.view = "search"
  } else form.view = "empty"

  return { ...initialStateProps, ...form }
}