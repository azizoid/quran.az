import { PropsWithChildren, Suspense } from 'react'

import { Form } from '@/components/Form/Form'
import { LoaderProgress } from '@/ui'

export const WithFormProvider = ({ children }: PropsWithChildren) => (
  <>
    <Suspense fallback={<LoaderProgress />}>
      <Form />
    </Suspense>

    {children}
  </>
)
