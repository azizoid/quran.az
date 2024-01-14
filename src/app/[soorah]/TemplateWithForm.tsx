import { PropsWithChildren } from 'react'

import { Form } from '@/components/Form/Form'
import { PaginateSoorahList } from '@/components/PaginateSoorahList/PaginateSoorahList'
import { Bismillah, SoorahCaption } from '@/ui'

type TemplateWithFormProps = PropsWithChildren<{
  soorah: number
  translator: number
  bismillah?: boolean
}>

const TemplateWithForm = ({
  soorah,
  translator,
  bismillah = true,
  children,
}: TemplateWithFormProps) => (
  <>
    <Form />

    <ul className="page-template-list">
      <SoorahCaption soorah={soorah} translator={translator} />

      {bismillah ? <Bismillah /> : null}

      {children}

      <PaginateSoorahList soorah={soorah} translator={translator} />
    </ul>
  </>
)

export default TemplateWithForm
