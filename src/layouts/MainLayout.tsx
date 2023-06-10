import Head from 'next/head'
import Link from 'next/link'
import { TiSocialFacebookCircular, TiSocialInstagram } from 'react-icons/ti'

import { Form, PrayerWidget, RandomAyah, FacebookPage } from '@/components'
import { Footer, Logo } from '@/ui'

import { FormContextProvider } from '@/store/form-store'

type MainLayoutProps = {
  children?: React.ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => (
  <FormContextProvider>
    <Head>
      <title>{'Öz Kitabını oxu | quran.az'}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>

    <div className="flex flex-col h-screen justify-between">
      <div className="bg-[url('/img/ornament.gif')] bg-gray-50 bg-repeat-x bg-bottom pb-[33px] px-3">
        <nav className="h-12 container mx-auto flex justify-between">
          <Link
            href="/"
            passHref={true}
            className="py-3 flex items-center content-start text-gray-500 hover:opacity-75"
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

      <div className="flex-grow container mx-auto mt-10 pb-2">
        <div className="grid grid-cols-12">
          <div className="col-span-12 lg:col-span-7 mx-0 lg:mx-4">
            <Form />
            {children}
          </div>
          <div className="col-span-12 lg:col-span-4 mx-4 text-small flex flex-col justify-items-start space-y-4">
            <PrayerWidget />
            <hr />
            <RandomAyah />
            <hr />
            <FacebookPage />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  </FormContextProvider>
)
