'use client'
import useSWR from 'swr'

import { Card } from '@/components/Card'
import { Link } from '@/components/Link'
import { buildUrl } from '@/helpers/buildUrl'
import { soorahAyahTitle } from '@/helpers/soorahAyahTitle'
import type { DisplayData } from '@/helpers/types'
import { fetcher } from '@/utility/fetcher'

import { LoaderDots } from '../LoaderDots'

export const RandomAyah = () => {
  const {
    data,
    isLoading,
    error: isError,
    mutate,
  } = useSWR<DisplayData>(['/api/v2/random', 'randomAyah'], fetcher, {
    revalidateOnMount: true,
    dedupingInterval: 60 * 60 * 1000, // TTL of 1 hour
    revalidateOnFocus: false,
    shouldRetryOnError: true,
    errorRetryCount: 3,
  })

  if (isLoading) {
    return (
      <Card title="Loading...">
        <LoaderDots />
      </Card>
    )
  }

  if (isError || !data) {
    return (
      <Card title="Error">
        <div className="text-red-500">
          Failed to load random ayah.
          <button
            type="button"
            onClick={() => mutate()}
            className="ml-2 text-blue-400 hover:underline"
          >
            Try again
          </button>
        </div>
      </Card>
    )
  }

  const { soorah, ayah, translator, content } = data

  return (
    <Card title={soorahAyahTitle(soorah, ayah)}>
      <h6>
        <Link href={buildUrl(soorah, ayah, translator)} className="text-blue-400 hover:underline">
          {content}
        </Link>
      </h6>
    </Card>
  )
}
