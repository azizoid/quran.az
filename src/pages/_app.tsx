import type { AppProps } from 'next/app'
import Script from 'next/script'

import { NextPage } from 'next'
import NextNprogress from 'nextjs-progressbar'

import { GA_TRACKING_ID } from '@/utility/gtag'

import '../styles/global.css'

type MyAppProps = AppProps & {
  Component: NextPage & {
    getLayout?: (page: JSX.Element) => JSX.Element
  }
}

const MyApp = ({ Component, pageProps }: MyAppProps) => {
  const getLayout = Component.getLayout ?? (page => page)

  return getLayout(
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${GA_TRACKING_ID}');
        `}
      </Script>
      <NextNprogress color='#86EFAC' />
      <Component {...pageProps} />
    </>
  )
}

// eslint-disable-next-line import/no-default-export
export default MyApp
