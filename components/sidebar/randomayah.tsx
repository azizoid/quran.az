import { Card, LoadingBoxes, soorahAyahTitle } from '@/ui'
import { useQuery } from 'react-query'

export const RandomAyah = (): JSX.Element => {
  const { data, isLoading, isError } = useQuery('randomVerse', async () => {
    const response = await fetch(`/api/random`);
    const data = await response.json();
    return data.success ? data.out : null;
  }, {
    staleTime: 60000,
    cacheTime: 300000
  });

  if (isLoading || isError) {
    return <LoadingBoxes />
  }

  const { soorah, ayah, translator, content } = data

  return (
    <Card title={soorahAyahTitle(soorah, ayah)}>
      <h6 className="text-blue-400 hover:underline">
        <a href={`/${soorah}/${ayah}?t=${translator}`}>{content}</a>
      </h6>
    </Card>
  )
}
