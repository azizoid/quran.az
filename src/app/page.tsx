import { SoorahList } from '@/components/SoorahList'
import { TopbarLinks } from '@/components/TopbarLinks/TopbarLinks'

const HomePage = () => {
  return (
    <div className="space-y-4 px-2 py-2">
      <TopbarLinks />

      <SoorahList />
    </div>
  )
}

export default HomePage
