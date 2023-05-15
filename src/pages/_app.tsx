import { ReactElement, ReactNode, useEffect, useState } from 'react'

import type { AppProps } from 'next/app'
import { ReactQueryDevtools } from 'react-query/devtools'

import { NextPage } from 'next'
import NextNprogress from 'nextjs-progressbar'
import TagManager from 'react-gtm-module'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'

import '../styles/global.css'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type MyAppWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps }: MyAppWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page)

  const [queryClient] = useState(() => new QueryClient())

  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-WZ9GX3M' })
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        {getLayout(
          <>
            <NextNprogress />

            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
          </>
        )}
      </Hydrate>
    </QueryClientProvider>
  )
}

// eslint-disable-next-line import/no-default-export
export default MyApp
