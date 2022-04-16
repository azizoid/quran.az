import Head from 'next/head'
import { MainLayout } from '../layouts/MainLayout'
import { Empty } from '../components'

export const Home = (): JSX.Element => (
  <MainLayout>
    <Head>
      <title>Öz Kitabını oxu | quran.az </title>
    </Head>
    <Empty />
  </MainLayout>
)

export default Home
