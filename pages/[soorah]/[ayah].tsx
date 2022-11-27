import { ReactElement } from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { MainLayout } from '@/layouts/MainLayout'

import { ColoredText, Bismillah, SoorahCaption, soorahAyahTitle } from '@/ui'

import { getApiData } from '@/utility'

import { PageStates } from '@/lib/types'

import { PaginateAyah } from '@/components'

export const Ayah = ({ out, error }) => {
  if (error === PageStates.NOT_FOUND) {
    return <div className="col-sm-12 alert alert-danger">Ayə tapılmamışdır</div>
  }

  const { soorah, ayah, content, translator, arabic, transliteration, prev, next } = out

  return (
    <>
      <Head>
        <title>{`${soorahAyahTitle(soorah, ayah)}, | Öz Kitabını oxu | quran.az`}</title>
        <meta name="description" content={content} />
      </Head>

      <ul className="list-none divide-y divide-gray-100 bg-white text-gray-700 mb-4">
        <SoorahCaption soorah={soorah} translator={translator} />
        {soorah !== 1 && ayah !== 1 && <Bismillah />}
        <li className="ayah-list-item flex flex-col">
          <span className="text-gray-400">{soorahAyahTitle(soorah, ayah)}</span>
          {content}
        </li>
        <li className="ayah-list-item ">
          <ColoredText key="transliteration" content={transliteration} />
        </li>
        <li className="ayah-list-item text-3xl font-Nunito text-right" dir="rtl">
          {arabic}
        </li>
        <li>
          <PaginateAyah {...{ soorah, ayah, prev, next, translator }} />
        </li>
      </ul>
    </>
  )
}

Ayah.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const soorah = Number(query.soorah)
  const ayah = Number(query.ayah)
  const translator = Number(query?.t?.toString()) || process.env.NEXT_PUBLIC_DEFAULT_TRANSLATOR

  const res = await getApiData(`/api/${soorah}/${ayah}?t=${translator}`)

  if (res?.success) {
    return {
      props: {
        error: '',
        out: res.out,
        data: res.data,
      },
    }
  }

  return {
    props: {
      error: PageStates.NOT_FOUND,
      out: {},
      data: { s: 0, a: '', translator },
    },
  }
}

// eslint-disable-next-line import/no-default-export
export default Ayah
