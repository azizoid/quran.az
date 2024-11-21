import '@/styles/global.css'
import { PropsWithChildren, Suspense } from 'react'

import { GoogleAnalytics } from '@next/third-parties/google'
import localFont from 'next/font/local'

import { Footer } from '@/components/Footer'
import { Form } from '@/components/Form/Form'
import { Header } from '@/components/Header'
import { PrayerWidget } from '@/components/Sidebar/prayer.widget'
import { GA_TRACKING_ID } from '@/utility/gtag'

import { MainMetadata, MainViewport } from './metadata'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata = MainMetadata
export const viewport = MainViewport

const RootLayout = ({ children }: PropsWithChildren) => (
  <html lang="az">
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <div className="flex h-screen flex-col justify-between">
        <Header />

        <div className="container mx-auto mt-10 grow pb-2">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
            <Suspense>
              <div className="bg-white md:col-span-8">
                <Form />
              </div>

              <div className="hidden md:col-span-4 md:block">
                <PrayerWidget />
              </div>
            </Suspense>
          </div>

          {children}
        </div>

        <Footer />
      </div>
      <GoogleAnalytics gaId={GA_TRACKING_ID} />
    </body>
  </html>
)

export default RootLayout
