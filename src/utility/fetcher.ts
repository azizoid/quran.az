export const fetcher = async <T>(url: string, data: T, method: 'GET' | 'POST' = 'GET') => {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(method === 'POST' && {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  })

  if (!response.ok) {
    throw new Error('An error occurred while fetching the data.')
  }

  const responseData = await response.json()
  return responseData
}
