import '@/styles/global.css'
import { PropsWithChildren } from 'react'

import { GoogleTagManager } from '@next/third-parties/google'
import localFont from 'next/font/local'

import { Footer } from '@/components/Footer'
import { Form } from '@/components/Form/Form'
import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar/Sidebar'
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

        <div className="flex-grow container mx-auto mt-10 pb-2">
          <div className="grid grid-cols-12">
            <div className="col-span-12 lg:col-span-7 mx-0 lg:mx-4 mb-4">
              <Form />

              {children}
            </div>

            <Sidebar />
          </div>
        </div>

        <Footer />
      </div>
      <GoogleTagManager gtmId={GA_TRACKING_ID} />
    </body>
  </html>
)

export default RootLayout
