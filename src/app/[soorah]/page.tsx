import { notFound } from 'next/navigation'

import { sirasayi } from 'sirasayi'

import { soorahList } from '@/assets/soorah-list-object'
import { SoorahAyah } from '@/components/SoorahAyah/SoorahAyah'
import { Bismillah } from '@/ui/Bismillah/Bismillah'
import { getView } from '@/utility/getView/getView'

import { getSoorahService } from './getSoorahService'

type SoorahProps = {
  params: Promise<{
    soorah: string
  }>
  searchParams: Promise<{
    t: string
  }>
}

export const dynamicParams = false

export const generateStaticParams = async () =>
  soorahList.map((item) => ({
    soorah: item.id.toString(),
  }))

export const generateMetadata = async (props: SoorahProps) => {
  const { soorah } = (await props.params) || {}
  const soorahTitle = soorahList.find((soorahItem) => soorahItem.id === Number(soorah))

  if (!soorahTitle) return

  const title = `${soorahTitle.fullTitle}, ${sirasayi(soorahTitle.id)} surə`

  return {
    title,
    openGraph: { title },
    twitter: { title },
  }
}

const SoorahPage = async (props: SoorahProps) => {
  const { t: translatorParam } = (await props.searchParams) || {}

  const { soorah: soorahParam } = (await props.params) || {}

  const {
    s: soorah,
    t: translator,
    view,
  } = getView({ s: Number(soorahParam), t: Number(translatorParam) })

  if (view !== 'soorah') {
    notFound()
  }

  const out = await getSoorahService({ soorah, translator })

  const sajda = soorahList.find((soorahItem) => soorahItem.id === soorah)?.sajda

  return (
    <>
      {soorah !== 9 ? <Bismillah /> : null}

      {out.map((outData) => (
        <SoorahAyah data={outData} key={outData.id} sajda={sajda} />
      ))}
    </>
  )
}

export default SoorahPage
