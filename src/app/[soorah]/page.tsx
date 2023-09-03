import { notFound } from 'next/navigation'

import sirasayi from 'sirasayi'

import { soorahList } from '@/assets/soorah-list-object'
import { PaginateSoorahList } from '@/components/PaginateSoorahList/PaginateSoorahList'
import { SoorahAyah } from '@/components/SoorahAyah/SoorahAyah'
import { Bismillah } from '@/ui'
import { getView } from '@/utility/getView/getView'

import { getSoorahService } from './getSoorahService'

type SoorahProps = {
  params: {
    soorah: string
  }
  searchParams: {
    t: string
  }
}

export const generateMetadata = async ({ params: { soorah } }: SoorahProps) => {
  const soorahTitle = soorahList.find((soorahItem) => soorahItem.id === Number(soorah))

  if (!soorahTitle) return

  const title = `${soorahTitle.fullTitle}, ${sirasayi(soorahTitle.id)} surə`

  return {
    title,
    openGraph: { title },
    twitter: { title },
  }
}

const SoorahPage = async ({
  params: { soorah: soorahParam },
  searchParams: { t: translatorParam },
}: SoorahProps) => {
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
      {soorah !== 9 && <Bismillah />}

      {out.map((outData) => (
        <SoorahAyah data={outData} key={outData.id} sajda={sajda} />
      ))}

      <PaginateSoorahList soorah={soorah} translator={translator} />
    </>
  )
}

export default SoorahPage
