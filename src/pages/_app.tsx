import { ReactElement, ReactNode, useEffect, useState } from 'react'

import type { AppProps } from 'next/app'

import { NextPage } from 'next'
import NextNprogress from 'nextjs-progressbar'
import TagManager from 'react-gtm-module'

import '../styles/global.css'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type MyAppWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps }: MyAppWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page)

  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-WZ9GX3M' })
  }, [])

  return (
    <>
      {getLayout(
        <>
          <NextNprogress />

          <Component {...pageProps} />
        </>
      )}
    </>
  )
}

// eslint-disable-next-line import/no-default-export
export default MyApp
