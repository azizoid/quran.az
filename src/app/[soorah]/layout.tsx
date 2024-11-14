import { PropsWithChildren } from 'react'

import { SoorahCaption } from './components/SoorahCaption'

type SoorahLayoutProps = PropsWithChildren<{
  params: Promise<{
    soorah: string
  }>
}>

const SoorahLayout = async ({ params, children }: SoorahLayoutProps) => {
  const { soorah: soorahParam } = await params

  const soorah = Number(soorahParam)

  return (
    <ul className="page-template-list">
      {soorah ? <SoorahCaption soorah={soorah} translator={1} /> : null}

      {children}
    </ul>
  )
}

export default SoorahLayout
