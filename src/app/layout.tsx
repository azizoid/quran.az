import '@/styles/global.css'
import { PropsWithChildren, Suspense } from 'react'

import { GoogleTagManager } from '@next/third-parties/google'
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
      <div className="flex flex-col h-screen justify-between">
        <Header />

        <div className="grow container mx-auto mt-10 pb-2">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <Suspense>
              <div className="md:col-span-8 bg-white">
                <Form />
              </div>

              <div className="md:col-span-4 hidden md:block">
                <PrayerWidget />
              </div>
            </Suspense>
          </div>

          <div className="bg-white py-2 px-2">{children}</div>
        </div>

        <Footer />
      </div>
      <GoogleTagManager gtmId={GA_TRACKING_ID} />
    </body>
  </html>
)

export default RootLayout
