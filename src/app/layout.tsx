import '@/styles/global.css'
import Link from 'next/link'
import Script from 'next/script'
import { TiSocialFacebookCircular, TiSocialInstagram } from 'react-icons/ti'

import { Footer, Logo } from '@/ui'
import { GA_TRACKING_ID } from '@/utility/gtag'

import { MainMetadata } from './metadata'

export type RootLayoutProps = {
  children?: React.ReactNode
}

export const metadata = MainMetadata

export const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="az">
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

    <body>
      <div className="flex flex-col h-screen justify-between">
        <div className="bg-[url('/img/ornament.gif')] bg-gray-50 bg-repeat-x bg-bottom pb-[33px] px-3">
          <nav className="h-12 container mx-auto flex justify-between">
            <Link
              href="/"
              className="py-3 flex items-center content-start text-gray-500 hover:opacity-75"
              prefetch={false}
            >
              <Logo />
              Quran.az
            </Link>

            <ul className="flex items-center space-x-2">
              <li>
                <a href="https://facebook.com/quranaz" target="_blank" rel="noreferrer">
                  <TiSocialFacebookCircular color="#4267B2" size="24" />
                </a>
              </li>
              <li>
                <a href="https://instagram.com/quranaz" target="_blank" rel="noreferrer">
                  <TiSocialInstagram color="#E1306C" size="24" />
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex-grow container mx-auto mt-10 pb-2">{children}</div>

        <Footer />
      </div>
    </body>
  </html>
)

export default RootLayout
