import useSWR from 'swr'

import { Card, LoadingBoxes, soorahAyahTitle } from '@/ui'
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
      <h6 className="text-blue-400 hover:underline">
        <a href={buildUrl(soorah, ayah, translator)}>{content}</a>
      </h6>
    </Card>
  )
}
