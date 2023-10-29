'use client'
import { PropsWithChildren } from 'react'

import { useParams, useSearchParams } from 'next/navigation'

import { Form } from '@/components/Form/Form'
import { SoorahCaption } from '@/ui'
import { getView } from '@/utility/getView/getView'

const SoorahTemplate = ({ children }: PropsWithChildren) => {
  const params = useParams()
  const searchParams = useSearchParams()
  const translator = searchParams.get('t')

  const data = getView({ s: Number(params.soorah), t: Number(translator) })

  if (data.view !== 'soorah' && data.view !== 'ayah') return

  return (
    <>
      <Form />

      <ul className="list-none divide-y divide-gray-100 bg-white text-gray-700">
        <SoorahCaption soorah={data.s} translator={data.t} />

        {children}
      </ul>
    </>
  )
}

export default SoorahTemplate
