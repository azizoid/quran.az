export const fetcher = async <T>(
  url: [string, string],
  data: T | null = null,
  method: 'GET' | 'POST' = 'GET'
) => {
  const [fetchUrl] = url

  const response = await fetch(fetchUrl, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: method === 'POST' ? 'POST' : 'GET',
    ...(data && { body: JSON.stringify(data) }),
  })

  if (!response.ok) {
    throw new Error('An error occurred while fetching the data.')
  }

  const responseData = await response.json()
  return responseData
}
