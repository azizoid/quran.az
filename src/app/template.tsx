import { PropsWithChildren } from 'react'

import { Sidebar } from '@/components/Sidebar/Sidebar'

export const RootTemplate = ({ children }: PropsWithChildren) => (
  <div className="grid grid-cols-12">
    <div className="col-span-12 lg:col-span-7 mx-0 lg:mx-4 mb-4">{children}</div>

    <Sidebar />
  </div>
)

export default RootTemplate
