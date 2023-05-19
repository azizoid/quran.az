import { FC, ReactElement } from 'react'

import Head from 'next/head'

import { GetServerSideProps, NextPage } from 'next'
import { sirasayi } from 'sirasayi'

import { getSoorah } from '@/lib/getSoorah'
import { SOORAH_LIST } from 'src/assets/soorah-list-object'
import { SoorahAyah, PaginateSoorahList } from 'src/components'
import { MainLayout } from 'src/layouts/MainLayout'
import { DisplayData, FormProps } from 'src/lib/types'
import { Bismillah, SoorahCaption } from 'src/ui'

type SoorahPageProps = {
  out: DisplayData[]
  data: FormProps & { translator: number }
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
        <SoorahCaption soorah={data.s} translator={data.translator} />

        {data.s !== 9 && <Bismillah />}

        {out.map((outData: DisplayData) => (
          <SoorahAyah data={outData} key={outData.id} sajda={sajda} />
        ))}

        <PaginateSoorahList soorah={data.s} translator={data.t} />
      </ul>
    </>
  )
}

Soorah.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

export const getServerSideProps: GetServerSideProps<SoorahPageProps> = async ({ query }) => {
  const soorah = Number(query.soorah)
  const translator = Number(query?.t?.toString() || process.env.NEXT_PUBLIC_DEFAULT_TRANSLATOR)

  try {
    const result = JSON.parse(await getSoorah({ soorah, translator }))

    return {
      props: {
        out: result.out,
        data: { ...result.data, translator },
      },
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching data:', error)
    return {
      notFound: true,
    }
  }
}

export default Soorah