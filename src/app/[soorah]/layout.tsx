import { PropsWithChildren } from 'react'

import { SoorahCaption } from '@/components/SoorahCaption/SoorahCaption'

type SoorahLayoutProps = PropsWithChildren<{
  params: Promise<{
    soorah: string
  }>
}>

const SoorahLayout = async ({ params, children }: SoorahLayoutProps) => {
  const { soorah: soorahParam } = await params

  const sooran = Number(soorahParam)

  return (
    <ul className="page-template-list">
      {sooran ? <SoorahCaption soorah={sooran} translator={1} /> : null}

      {children}
    </ul>
  )
}

export default SoorahLayout
