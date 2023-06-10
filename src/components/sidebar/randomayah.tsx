import useSWR from 'swr'

import { Card, LoadingBoxes, soorahAyahTitle } from '@/ui'
import { fetcher } from '@/utility/fetcher'

export const RandomAyah = (): JSX.Element => {
  const { data, isLoading, error: isError } = useSWR(
    '/api/random', fetcher, {
    revalidateOnMount: true,
    dedupingInterval: 60 * 60 * 1000, // TTL of 1 hour
  }
  )

  if (isLoading || isError) {
    return <LoadingBoxes />
  }

  const { soorah, ayah, translator, content } = data.out

  return (
    <Card title={soorahAyahTitle(soorah, ayah)}>
      <h6 className="text-blue-400 hover:underline">
        <a href={`/${soorah}/${ayah}?t=${translator}`}>{content}</a>
      </h6>
    </Card>
  )
}
