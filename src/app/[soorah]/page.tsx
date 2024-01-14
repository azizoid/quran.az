import { notFound } from 'next/navigation'

import sirasayi from 'sirasayi'

import { soorahList } from '@/assets/soorah-list-object'
import { Form } from '@/components/Form/Form'
import { PaginateSoorahList } from '@/components/PaginateSoorahList/PaginateSoorahList'
import { SoorahAyah } from '@/components/SoorahAyah/SoorahAyah'
import { Bismillah, SoorahCaption } from '@/ui'
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

export const dynamicParams = false

export const generateStaticParams = async () =>
  soorahList.map((item) => ({
    soorah: item.id.toString(),
  }))

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
      <Form />

      <ul className="list-none divide-y divide-gray-100 bg-white text-gray-700">
        <SoorahCaption soorah={soorah} translator={translator} />

        {soorah !== 9 && <Bismillah />}

        {out.map((outData) => (
          <SoorahAyah data={outData} key={outData.id} sajda={sajda} />
        ))}

        <PaginateSoorahList soorah={soorah} translator={translator} />
      </ul>
    </>
  )
}

export default SoorahPage
