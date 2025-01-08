import { notFound } from 'next/navigation'

import { sirasayi } from 'sirasayi'

import { Bismillah } from '@/app/[soorah]/components/Bismillah'
import { soorahList } from '@/assets/soorah-list-object'
import { TemplateAyahList } from '@/components/TemplateAyahList'
import { getSoorahService } from '@/services/getSoorahService'
import { getView } from '@/utility/getView/getView'

type SoorahPageProps = {
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

export const generateMetadata = async (props: SoorahPageProps) => {
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

const SoorahPage = async (props: SoorahPageProps) => {
  const { t: translatorParam } = (await props.searchParams) || {}

  const { soorah: soorahParam } = (await props.params) || {}

  const { soorah, translator, view } = getView({
    soorah: Number(soorahParam),
    translator: Number(translatorParam),
  })

  if (view !== 'soorah') {
    notFound()
  }

  const out = await getSoorahService({ soorah, translator })

  const sajda = soorahList.find((soorahItem) => soorahItem.id === soorah)?.sajda

  return (
    <>
      {soorah !== 9 ? <Bismillah /> : null}

      {out.map((outData) => (
        <TemplateAyahList data={outData} key={outData.id} sajda={sajda} variant="short" />
      ))}
    </>
  )
}

export default SoorahPage
