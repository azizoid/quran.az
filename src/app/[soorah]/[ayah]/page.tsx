import { notFound, redirect } from 'next/navigation'

import sirasayi from 'sirasayi'

import { soorahList } from '@/assets/soorah-list-object'
import { PaginateAyah } from '@/components/PaginateAyah/PaginateAyah'
import { Bismillah, ColoredText, soorahAyahTitle } from '@/ui'
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
  const soorahTitle = soorahList.find((soorahItem) => soorahItem.id === Number(soorah))

  if (!soorahTitle) return

  const title = `${soorahTitle.fullTitle}, ${sirasayi(soorahTitle.id)} surə, ${sirasayi(
    Number(ayah)
  )} ayə`

  return {
    title,
    openGraph: { title },
    twitter: { title },
  }
}

const AyahPage = async ({
  params: { soorah: soorahParam, ayah: ayahParam },
  searchParams: { t: translatorParam },
}: AyahProps) => {
  const {
    s: soorah,
    a: ayah,
    t: translator,
    view,
  } = getView({ s: Number(soorahParam), a: Number(ayahParam), t: Number(translatorParam) })

  if (view !== 'ayah') {
    if (view === 'soorah') {
      redirect(`/${soorah}?t=${translator}`)
    }

    notFound()
  }

  const out = await getAyahService({ soorah, ayah, translator })

  const { content, arabic, transliteration, prev, next } = out

  return (
    <>
      <Bismillah />

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
}

export default AyahPage
