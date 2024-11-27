import { Link } from '@/components/Link'
import { SoorahList } from '@/components/SoorahList'

const topLinks = [
  ['/1', 'Fatihə surəsi'],
  ['/36', 'Ya-sin surəsi'],
  ['/55', 'Ər-Rəhman surəsi'],
  ['/67', 'Əl-Mülk surəsi'],
  ['/2/255', 'Ayətul-Kürsi'],
]

const Home = () => (
  <div className="space-y-4 px-2 py-2">
    <ol className="flex w-full justify-center space-x-5 text-sm text-gray-500 md:text-base">
      {topLinks.map(([url, urlText]) => (
        <li key={url}>
          <Link href={url}>{urlText}</Link>
        </li>
      ))}
    </ol>

    <SoorahList />
  </div>
)

export default Home
