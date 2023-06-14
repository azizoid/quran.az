'use client'
import dynamic from 'next/dynamic'
import Script from 'next/script'

import { GA_TRACKING_ID } from '@/utility/gtag'

export const PrayerWidget = dynamic(
  () => import('@/components/sidebar/prayer.widget').then((res) => res.PrayerWidget),
  { ssr: false }
)
export const RandomAyah = dynamic(
  () => import('@/components/sidebar/randomayah').then((res) => res.RandomAyah),
  { ssr: false }
)
export const FacebookPage = dynamic(
  () => import('@/components/sidebar/facebook.page').then((res) => res.FacebookPage),
  { ssr: false }
)

type MainLayoutProps = {
  children?: React.ReactNode
}

export const MainTemplate = ({ children }: MainLayoutProps) => (
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

    <div className="grid grid-cols-12">
      <div className="col-span-12 lg:col-span-7 mx-0 lg:mx-4">{children}</div>

      <div className="col-span-12 lg:col-span-4 mx-4 text-small flex flex-col justify-items-start space-y-4">
        {/* <PrayerWidget />
      <hr />
      <RandomAyah />
      <hr />
      <FacebookPage /> */}
        <hr />
      </div>
    </div>
  </>
)

export default MainTemplate
