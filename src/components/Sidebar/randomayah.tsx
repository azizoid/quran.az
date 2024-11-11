'use client'
import Link from 'next/link'

import useSWR from 'swr'

import { Card } from '@/components/Card/Card'
import { buildUrl } from '@/helpers/buildUrl'
import { soorahAyahTitle } from '@/helpers/soorahAyahTitle'
import { fetcher } from '@/utility/fetcher'

import { LoaderDots } from '../LoaderDots'

export const RandomAyah = () => {
  const {
    data,
    isLoading,
    error: isError,
  } = useSWR(['/api/v2/random', 'randomAyah'], fetcher, {
    revalidateOnMount: true,
    dedupingInterval: 60 * 60 * 1000, // TTL of 1 hour
  })

  if (isLoading || isError) {
    return <LoaderDots />
  }

  const { soorah, ayah, translator, content } = data

  return (
    <Card title={soorahAyahTitle(soorah, ayah)}>
      <h6>
        <Link
          href={buildUrl(soorah, ayah, translator)}
          className="text-blue-400 hover:underline"
          prefetch={false}
        >
          {content}
        </Link>
      </h6>
    </Card>
  )
}
