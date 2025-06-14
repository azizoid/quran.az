'use client'

import useSWR from 'swr'

import { SoorahListProps } from '@/assets/soorah-list-object'
import { Link } from '@/components/Link'
import { fetcher } from '@/utility/fetcher'

export const TopbarLinks = () => {
  const { data: topLinks } = useSWR<SoorahListProps[]>(
    [`/api/v2/random/topbar`, 'topbarLinks'],
    (url: [string, string]) => fetcher(url),
    {
      refreshInterval: 0,
      dedupingInterval: 60 * 60 * 1000, // TTL of 1 hour
      keepPreviousData: false,
    }
  )

  return (
    <ol className="flex w-full justify-center space-x-5 text-sm text-gray-500 md:text-base">
      {topLinks
        ?.sort((a, b) => a.id - b.id)
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
  )
}
