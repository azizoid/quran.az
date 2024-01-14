import { Suspense } from 'react'

import { Empty } from '@/components/Empty/Empty'
import { Form } from '@/components/Form/Form'
import { LoaderProgress } from '@/ui'

export const dynamic = 'force-static'

const Home = () => (
  <>
    <Suspense fallback={<LoaderProgress />}>
      <Form />
    </Suspense>

    <Empty />
  </>
)

export default Home
