import { WithFormProvider } from '@/providers/WithFormProvider'
import { LoadingBoxes } from '@/ui'

export const MainLoader = () => (
  <WithFormProvider>
    <LoadingBoxes />
  </WithFormProvider>
)

export default MainLoader
