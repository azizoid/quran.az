import { FC, ReactElement } from 'react'

import Head from 'next/head'

import { GetServerSideProps } from 'next'

import { PaginateAyah } from 'src/components'
import { MainLayout } from 'src/layouts/MainLayout'
import { ColoredText, Bismillah, SoorahCaption, soorahAyahTitle } from 'src/ui'

import { AyahResponseType } from '../api/[soorah]/[ayah]'

export interface AyahPageProps extends Pick<AyahResponseType, 'soorah' | 'ayah' | 'content' | 'arabic' | 'transliteration' | 'prev' | 'next'> {
  translator: number
}

export const Ayah: FC<AyahPageProps> & { getLayout: (page: ReactElement) => JSX.Element } = ({
  soorah,
  ayah,
  content,
  translator,
  arabic,
  transliteration,
  prev,
  next,
}) => (
  <>
    <Head>
      <title>{`${soorahAyahTitle(soorah, ayah)}, | Öz Kitabını oxu | quran.az`}</title>
      <meta name="description" content={content} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
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

Ayah.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const soorah = Number(query.soorah)
  const ayah = Number(query.ayah)
  const translator = Number(query?.t?.toString()) || process.env.NEXT_PUBLIC_DEFAULT_TRANSLATOR

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/${soorah}/${ayah}?t=${translator}`)

    if (res.ok) {
      const data = await res.json()

      if (!data.success) {
        return {
          notFound: true,
        }
      }

      return {
        props: {
          ...data.out,
        },
      }
    } else {
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`)
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching data:', error)
    return {
      notFound: true,
    }
  }
}

export default Ayah
