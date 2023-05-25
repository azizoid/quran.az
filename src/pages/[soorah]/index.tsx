import { ReactElement } from 'react'

import * as Sentry from '@sentry/node'
import Head from 'next/head'

import { GetServerSideProps, NextPage } from 'next'
import { sirasayi } from 'sirasayi'

import { SoorahAyah, PaginateSoorahList } from '@/components'
import { MainLayout } from '@/layouts/MainLayout'
import { getSoorahService } from '@/lib/getSoorah'
import { DisplayData, FormProps } from '@/lib/types'
import { Bismillah, SoorahCaption } from '@/ui'
import { getView } from '@/utility'
import { SOORAH_LIST } from 'src/assets/soorah-list-object'

type SoorahPageProps = {
  out: DisplayData[]
  data: FormProps
}

export const Soorah: NextPage<SoorahPageProps> & { getLayout: (page: ReactElement) => JSX.Element } = ({ out, data }) => {
  const sajda = SOORAH_LIST[data.s]?.sajda

  return (
    <>
      <Head>
        <title>{`${SOORAH_LIST[data.s]['fullTitle']}, ${sirasayi(
          SOORAH_LIST[data.s]['id']
        )} surə | Öz Kitabını oxu | quran.az`}</title>
        <meta
          name="description"
          content={out
            .slice(0, 15)
            .map(({ content }) => content)
            .join(' ')}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ul className="list-none divide-y divide-gray-100 bg-white text-gray-700">
        <SoorahCaption soorah={data.s} translator={data.t} />

        {data.s !== 9 && <Bismillah />}

        {out.map((outData: DisplayData) => (
          <SoorahAyah data={outData} key={outData.id} sajda={sajda} />
        ))}

        <PaginateSoorahList soorah={data.s} translator={data.t} />
      </ul>
    </>
  )
}

Soorah.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>

export const getServerSideProps: GetServerSideProps<SoorahPageProps> = async ({ query, res }) => {
  const soorah = Number(query.soorah)
  const translator = Number(query?.t?.toString()) || Number(process.env.NEXT_PUBLIC_DEFAULT_TRANSLATOR)

  const data = getView({ s: soorah, t: translator })

  if (data.view !== 'soorah') {
    return {
      redirect: {
        destination: '/?not-a-soorah',
        permanent: false,
      },
    }
  }

  try {
    const { out } = JSON.parse(await getSoorahService({ soorah, translator }))

    return {
      props: {
        out, data,
      },
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Soorah Error fetching data:', error)

    Sentry.captureException(error) // Log the error to Sentry

    return {
      notFound: true,
    }
  }
}

export default Soorah