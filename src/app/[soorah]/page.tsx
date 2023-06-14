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

export const generateMetadata = async ({ params }: SoorahProps) => {
  const { soorah } = params
  const soorahTitle = soorahList.find((soorahItem) => soorahItem.id === Number(soorah))

  if (!soorahTitle) return

  const title = `${soorahTitle.fullTitle}, ${sirasayi(soorahTitle.id)} surə`

  return {
    title,
    openGraph: { title },
    twitter: { title },
  }
}

const SoorahPage = async ({ params: { soorah }, searchParams: { t: translator } }: SoorahProps) => {
  const data = getView({ s: Number(soorah), t: Number(translator) })

  if (data.view !== 'soorah') {
    notFound()
  }

  const out = await getSoorahService({ soorah: data.s, translator: data.t })

  const sajda = soorahList.find((soorahItem) => soorahItem.id === data.s)?.sajda

  return (
    <>
      {data.s !== 9 && <Bismillah />}

      {out.map((outData) => (
        <SoorahAyah data={outData} key={outData.id} sajda={sajda} />
      ))}

      <PaginateSoorahList soorah={data.s} translator={data.t} />
    </>
  )
}

export default SoorahPage
