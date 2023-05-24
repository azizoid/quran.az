import { useEffect } from 'react'

import type { AppProps } from 'next/app'

import { NextPage } from 'next'
import NextNprogress from 'nextjs-progressbar'
import TagManager from 'react-gtm-module'
import '../styles/global.css'

type MyAppProps = AppProps & {
  Component: NextPage & {
    getLayout?: (page: JSX.Element) => JSX.Element
  }
}

const MyApp = ({ Component, pageProps }: MyAppProps) => {
  const getLayout = Component.getLayout ?? (page => page)

  useEffect(() => {
    TagManager.initialize({ gtmId: process.env.NEXT_PUBLIC_GTM_ID })
  }, [])

  return getLayout(
    <>
      <NextNprogress color='#86EFAC' />
      <Component {...pageProps} />
    </>
  )
}

// eslint-disable-next-line import/no-default-export
export default MyApp
