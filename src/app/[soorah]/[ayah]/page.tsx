import { notFound, redirect } from 'next/navigation'

import { PaginateAyah } from '@/components/PaginateAyah/PaginateAyah'
import { Bismillah, ColoredText, SoorahCaption, soorahAyahTitle } from '@/ui'
import { getView } from '@/utility/getView/getView'

import { getAyahService } from './getAyahService'

export const dynamic = 'force-dynamic'
export const dynamicParams = true

type SoorahProps = {
  params: {
    soorah: string
    ayah: string
  },
  searchParams: {
    t: string
  }
}

export const Ayah = async ({ params: { soorah: soorahParam, ayah: ayahParam }, searchParams: { t: translatorParam } }: SoorahProps) => {
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

  const out = await getAyahService({ soorah: data.s, ayah: data.a, translator: data.t })

  const {
    content,
    arabic,
    transliteration,
    prev,
    next,
  } = out

  return (
    <ul className="list-none divide-y divide-gray-100 bg-white text-gray-700 mb-4">
      <SoorahCaption soorah={soorah} translator={translator} />

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
    </ul>
  )
}

export default Ayah