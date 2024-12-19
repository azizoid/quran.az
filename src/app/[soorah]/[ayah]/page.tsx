import { notFound, redirect } from 'next/navigation'

import { sirasayi } from 'sirasayi'

import { Bismillah } from '@/app/[soorah]/components/Bismillah'
import { soorahList } from '@/assets/soorah-list-object'
import { soorahAyahTitle } from '@/helpers/soorahAyahTitle'
import { getView } from '@/utility/getView/getView'

import { ColoredText } from '../components/ColoredText'
import { PaginateAyah } from '../components/PaginateAyah'

import { getAyahService } from './getAyahService'

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

  const { soorah, ayah, translator, view } = getView({
    soorah: Number(soorahParam),
    ayah: Number(ayahParam),
    translator: Number(translatorParam),
  })

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

      <li className="ayah-list-item prose flex !max-w-none flex-col">
        <span className="text-gray-400">{soorahAyahTitle(soorah, ayah)}</span>
        {content}
      </li>
      <li className="ayah-list-item prose !max-w-none">
        <ColoredText content={transliteration} />
      </li>
      <li className="ayah-list-item text-right font-Nunito text-3xl" dir="rtl">
        {arabic}
      </li>
      <li className="py-2">
        <PaginateAyah {...{ soorah, activePage: ayah, translator }} />
      </li>
    </>
  )
}

export default AyahPage
