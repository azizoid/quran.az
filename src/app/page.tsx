import Link from 'next/link'

import { SoorahList } from '@/components/SoorahList'

const topLinks = [
  ['/1', 'Fatihə surəsi'],
  ['/36', 'Ya-sin surəsi'],
  ['/55', 'Ər-Rəhman surəsi'],
  ['/67', 'Əl-Mülk surəsi'],
  ['/2/255', 'Ayətul-Kürsi'],
]

const Home = () => (
  <div className="space-y-4">
    <ol className="w-full flex justify-center text-gray-500 space-x-5 text-sm md:text-base">
      {topLinks.map(([url, urlText]) => (
        <li key={url}>
          <Link href={url} prefetch={false}>
            {urlText}
          </Link>
        </li>
      ))}
    </ol>

    <SoorahList />
  </div>
)

export default Home
