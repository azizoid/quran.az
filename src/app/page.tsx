import { Suspense } from 'react'

import { Empty } from '@/components/Empty/Empty'
import { Form } from '@/components/Form/Form'

const Home = () => (
  <>
    <Suspense fallback={'Loading...'}>
      <Form />
    </Suspense>

    <Empty />
  </>
)

export default Home
