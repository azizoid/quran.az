import React, { useEffect } from 'react'
import type { AppProps } from 'next/app'
import TagManager from 'react-gtm-module'

import NextNprogress from 'nextjs-progressbar'

import { FormContextProvider } from '../store/form-store'

import '../styles/global.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-WZ9GX3M' })
  }, [])
  return (
    <FormContextProvider>
      <NextNprogress />

      <Component {...pageProps} />
    </FormContextProvider>
  )
}

export default MyApp
