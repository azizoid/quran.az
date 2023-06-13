import { notFound } from 'next/navigation'

import { SOORAH_LIST } from '@/assets/soorah-list-object'
import { PaginateSoorahList } from '@/components/PaginateSoorahList/PaginateSoorahList'
import { SoorahAyah } from '@/components/SoorahAyah/SoorahAyah'
import { Bismillah, SoorahCaption } from '@/ui'
import { getView } from '@/utility/getView/getView'

import { getSoorahService } from './getSoorahService'

export const dynamic = 'force-dynamic'
export const dynamicParams = true

type SoorahProps = {
  params: {
    soorah: string
  },
  searchParams: {
    t: string
  }
}

export const Soorah = async ({ params: { soorah }, searchParams: { t: translator } }: SoorahProps) => {

  const data = getView({ s: Number(soorah), t: Number(translator) })

  const out = await getSoorahService({ soorah: data.s, translator: data.t })

  if (data.view !== 'soorah') {
    notFound()
  }

  const sajda = SOORAH_LIST[data.s]?.sajda

  return (
    <ul className="list-none divide-y divide-gray-100 bg-white text-gray-700">
      <SoorahCaption soorah={data.s} translator={data.t} />

      {data.s !== 9 && <Bismillah />}

      {out.map((outData) => (
        <SoorahAyah data={outData} key={outData.id} sajda={sajda} />
      ))}

      <PaginateSoorahList soorah={data.s} translator={data.t} />
    </ul>
  )
}

export default Soorah