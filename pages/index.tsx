import { ReactElement } from 'react'
import Head from 'next/head'
import { MainLayout } from '@/layouts/MainLayout'
import { Empty } from '@/components'

export const Home = (): JSX.Element => (
  <>
    <Head>
      <title>{`Öz Kitabını oxu | quran.az`}</title>
    </Head>
    <Empty />
  </>
)

Home.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

// eslint-disable-next-line import/no-default-export
export default Home
