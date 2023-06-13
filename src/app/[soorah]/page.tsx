import * as Sentry from '@sentry/node'
import { notFound } from 'next/navigation'
import { NextResponse } from 'next/server'

import { SOORAH_LIST } from '@/assets/soorah-list-object'
import { PaginateSoorahList } from '@/components/PaginateSoorahList/PaginateSoorahList'
import { SoorahAyah } from '@/components/SoorahAyah/SoorahAyah'
import { Bismillah, SoorahCaption } from '@/ui'
import { getView } from '@/utility/getView/getView'

import { getSoorahService } from './getSoorahService'

type SoorahProps = {
  params: {
    soorah: string
  },
  searchParams: {
    t: string
  }
}

const Soorah = async ({ params: { soorah }, searchParams: { t: translator } }: SoorahProps) => {
  try {
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
  } catch (error) {
    Sentry.captureException(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export default Soorah