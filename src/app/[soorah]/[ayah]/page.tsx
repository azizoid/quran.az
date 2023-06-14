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

  const soorah = Number(soorahParam)
  const ayah = Number(ayahParam)
  const translator = Number(translatorParam)

  const data = getView({ s: soorah, a: ayah, t: translator })

  if (data.view !== 'ayah') {
    if (data.view === 'soorah') {
      redirect(`/${data.s}?t=${data.t}`)
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
}

export default AyahPage
