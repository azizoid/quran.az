import { SoorahListProps } from '@/assets/soorah-list-object'
import { Link } from '@/components/Link'
import { SoorahList } from '@/components/SoorahList'
import { fetcher } from '@/utility/fetcher'

export const revalidate = 3600

const Home = async () => {
  const topLinks = fetcher([
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/random/topbar`,
    'topbar-links',
  ]) as unknown as SoorahListProps[]

  return (
    <div className="space-y-4 px-2 py-2">
      <ol className="flex w-full justify-center space-x-5 text-sm text-gray-500 md:text-base">
        {topLinks
          .sort((a, b) => a.id - b.id)
          .map(({ id, fullTitle }) => (
            <li key={id} className="group relative flex items-center justify-center">
              <Link
                href={`/${id}`}
                className="inline-block rounded-lg px-4 py-2 text-center transition-all duration-300 hover:bg-gray-200 hover:text-gray-900 focus:ring-2 focus:ring-gray-400 active:bg-gray-300"
              >
                {`${id}. ${fullTitle}`}
              </Link>
            </li>
          ))}
      </ol>

      <SoorahList />
    </div>
  )
}

export default Home
