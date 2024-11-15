import { PropsWithChildren } from 'react'

import { Sidebar } from '@/components/Sidebar/Sidebar'

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
    <div className="flex flex-wrap py-2 px-2">
      <ul className="flex-grow-[2] w-full md:w-2/3">
        {soorah ? <SoorahCaption soorah={soorah} translator={1} /> : null}

        {children}
      </ul>

      <div className="flex-grow w-full md:w-1/3">
        <Sidebar />
      </div>
    </div>
  )
}

export default SoorahLayout
