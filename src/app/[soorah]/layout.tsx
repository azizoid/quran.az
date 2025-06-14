import { PropsWithChildren } from 'react'
import { notFound } from 'next/navigation'

import { Sidebar } from '@/components/Sidebar/Sidebar'

import { SoorahCaption } from './components/SoorahCaption'

type SoorahLayoutProps = PropsWithChildren<{
  params: Promise<{
    soorah: string
  }>
}>

const SoorahLayout = async ({ params, children }: SoorahLayoutProps) => {
  const { soorah: soorahParam } = await params

  const soorah = parseInt(soorahParam, 10)

  // Validate soorah number
  if (isNaN(soorah) || soorah < 1 || soorah > 114) {
    notFound()
  }

  return (
    <div className="flex flex-wrap px-2 py-2">
      <ul className="w-full flex-grow-2 md:w-2/3">
        {soorah ? <SoorahCaption soorah={soorah} translator={1} /> : null}

        {children}
      </ul>

      <div className="w-full grow md:w-1/3">
        <Sidebar />
      </div>
    </div>
  )
}

export default SoorahLayout
