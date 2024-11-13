import { notFound, redirect } from 'next/navigation'

import { sirasayi } from 'sirasayi'

import { soorahList } from '@/assets/soorah-list-object'
import { Bismillah } from '@/components/Bismillah/Bismillah'
import { ColoredText } from '@/components/ColoredText/ColoredText'
import { soorahAyahTitle } from '@/helpers/soorahAyahTitle'
import { getView } from '@/utility/getView/getView'

import { getAyahService } from './getAyahService'
import { PaginateAyah } from './PaginateAyah'

type AyahPageProps = {
  params: Promise<{
    soorah: string
    ayah: string
  }>
  searchParams: Promise<{
    t: string
  }>
}

export const generateMetadata = async (props: AyahPageProps) => {
  const { soorah, ayah } = (await props.params) || {}

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

const AyahPage = async (props: AyahPageProps) => {
  const { t: translatorParam } = (await props.searchParams) || {}

  const { soorah: soorahParam, ayah: ayahParam } = (await props.params) || {}

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

  const { content, arabic, transliteration } = out

  return (
    <>
      <Bismillah />

      <li className="prose !max-w-none ayah-list-item flex flex-col">
        <span className="text-gray-400">{soorahAyahTitle(soorah, ayah)}</span>
        {content}
      </li>
      <li className="prose !max-w-none ayah-list-item">
        <ColoredText key="transliteration" content={transliteration} />
      </li>
      <li className="ayah-list-item text-3xl font-Nunito text-right" dir="rtl">
        {arabic}
      </li>
      <li className="py-2">
        <PaginateAyah {...{ soorah, ayah, translator }} />
      </li>
    </>
  )
}

export default AyahPage
