import * as Sentry from '@sentry/node'
import { notFound, redirect } from 'next/navigation'
import { NextResponse } from 'next/server'

import sirasayi from 'sirasayi'

import { soorahList } from '@/assets/soorah-list-object'
import { PaginateAyah } from '@/components/PaginateAyah/PaginateAyah'
import { Bismillah, ColoredText, SoorahCaption, soorahAyahTitle } from '@/ui'
import { getView } from '@/utility/getView/getView'

import { getAyahService } from './getAyahService'

type AyahProps = {
  params: {
    soorah: string
    ayah: string
  }
  searchParams: {
    t: string
  }
}

export const generateMetadata = async ({ params }: AyahProps) => {
  const { soorah, ayah } = params
  const soorahTitle = soorahList.find((soorahItem) => soorahItem.id === Number(soorah))!

  const title = `${soorahTitle.fullTitle}, ${sirasayi(soorahTitle.id)} surə, ${sirasayi(
    Number(ayah)
  )} ayə`

  return {
    title,
    openGraph: { title },
    twitter: { title },
  }
}

const Ayah = async ({
  params: { soorah: soorahParam, ayah: ayahParam },
  searchParams: { t: translatorParam },
}: AyahProps) => {
  try {
    const soorah = Number(soorahParam)
    const ayah = Number(ayahParam)
    const translator = Number(translatorParam)

    const data = getView({ s: soorah, a: ayah, t: translator })

    if (data.view !== 'ayah') {
      if (data.view === 'soorah') {
        redirect(`/${soorah}?t=${data.t}`)
      }

      notFound()
    }

    const out = await getAyahService({ soorah: data.s, ayah: Number(data.a), translator: data.t })

    const { content, arabic, transliteration, prev, next } = out

    return (
      <>
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
      </>
    )
  } catch (error) {
    Sentry.captureException(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export default Ayah
