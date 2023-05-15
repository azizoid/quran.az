import { useQuery } from 'react-query'

import { Card, LoadingBoxes, soorahAyahTitle } from 'src/ui'

export const RandomAyah = (): JSX.Element => {
  const { data, isLoading, isError } = useQuery(
    'randomVerse',
    async () => {
      const response = await fetch('/api/random')
      const responseData = await response.json()
      return responseData.success ? responseData.out : null
    },
    {
      staleTime: 60000,
      cacheTime: 300000,
    }
  )

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
