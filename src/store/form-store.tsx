import { createContext, useEffect, useMemo, useState } from 'react'

import { useRouter } from 'next/router'

import { FormProps } from '@/lib/types'
import { getView } from '@/utility'

export const FormContext = createContext({} as FormProps)

type FormContextProviderProps = {
  children?: React.ReactNode
}

export const FormContextProvider = ({ children }: FormContextProviderProps) => {
  const { query } = useRouter()
  const [state, setState] = useState<FormProps>({} as FormProps)

  const getDataFromRouter = useMemo(
    () =>
      getView({
        s: Number(query?.soorah?.toString()) || 0,
        a: Number(query?.ayah?.toString()) || '',
        q: query?.search?.toString() || '',
        t: Number(query?.t?.toString()),
      }),
    [query?.ayah, query?.search, query?.soorah, query?.t]
  )

  useEffect(() => {
    setState(getDataFromRouter)
  }, [getDataFromRouter])

  return <FormContext.Provider value={state}>{children}</FormContext.Provider>
}
