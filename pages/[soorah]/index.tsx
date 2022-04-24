import { ReactElement } from 'react'
import Head from 'next/head'
import { GetServerSideProps } from 'next'

import { MainLayout } from '@/layouts/MainLayout'
import { SoorahAyah, PaginateSoorahList } from '@/components'
import { SOORAH_LIST } from '@/assets/soorah-list-object'
import { getApiData } from '@/utility'
import { DisplayData, PageStates } from '@/lib/types'
import { Bismillah, SoorahCaption } from '@/ui'

export const Soorah = ({ out, data, error }): JSX.Element => {
  if (error === PageStates.NOT_FOUND) {
    return (
      <div className="text-center">
        <div className="col-sm-12 alert alert-danger">Surə tapılmamışdır</div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>{SOORAH_LIST[data.s]['fullTitle']} | Öz Kitabını oxu | quran.az</title>
        <meta
          name="description"
          content={out
            .slice(0, 15)
            .map(({ content }) => content)
            .join(' ')}
        />
      </Head>
      <ul className="list-none divide-y divide-gray-100 bg-white text-gray-700">
        <SoorahCaption soorah={data.s} translator={data.translator} />
        {data.s !== 9 && <Bismillah />}
        {out.map((data: DisplayData) => (
          <SoorahAyah data={data} key={data.id} />
        ))}
        <PaginateSoorahList soorah={data.s} translator={data.t} />
      </ul>
    </>
  )
}

Soorah.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params, query } = context
  const translator = Number(query?.t?.toString()) || process.env.NEXT_PUBLIC_DEFAULT_TRANSLATOR

  const res = await getApiData(`/api/${params.soorah}?t=${translator}`)

  if (res?.success) {
    return {
      props: {
        error: '',
        out: res.out,
        data: { ...res.data, translator },
      },
    }
  }

  return {
    props: {
      error: PageStates.NOT_FOUND,
      out: [],
      data: { s: 0, a: '', translator },
    },
  }
}

// eslint-disable-next-line import/no-default-export
export default Soorah
