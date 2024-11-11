'use client'
import Link from 'next/link'

import useSWR from 'swr'

import { Card } from '@/ui/Card/Card'
import { LoadingBoxes } from '@/ui/LoadingBoxes/LoadingBoxes'
import { soorahAyahTitle } from '@/ui/soorahAyahTitle/soorahAyahTitle'
import { buildUrl } from '@/utility/buildUrl'
import { fetcher } from '@/utility/fetcher'

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
    return <LoadingBoxes />
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
