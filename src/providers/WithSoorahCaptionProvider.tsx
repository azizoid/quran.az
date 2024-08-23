import { PropsWithChildren } from 'react'

import { PaginateSoorahList } from '@/components/PaginateSoorahList/PaginateSoorahList'
import { WithFormProvider } from '@/providers/WithFormProvider'
import { Bismillah, SoorahCaption } from '@/ui'

type WithSoorahCaptionProviderProps = PropsWithChildren<{
  soorah: number
  translator: number
  bismillah?: boolean
}>

export const WithSoorahCaptionProvider = ({
  soorah,
  translator,
  bismillah = true,
  children,
}: WithSoorahCaptionProviderProps) => (
  <WithFormProvider>
    <div className="page-template-list">
      <SoorahCaption soorah={soorah} translator={translator} />

      {bismillah ? <Bismillah /> : null}

      {children}

      <PaginateSoorahList soorah={soorah} translator={translator} />
    </div>
  </WithFormProvider>
)
