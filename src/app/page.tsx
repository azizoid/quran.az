import { Empty } from '@/components/Empty/Empty'
import { WithFormProvider } from '@/providers/WithFormProvider'

export const dynamic = 'force-static'

const Home = () => (
  <WithFormProvider>
    <Empty />
  </WithFormProvider>
)

export default Home
