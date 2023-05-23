export const fetcher = async (url: string) => {
  const response = await fetch(url)
  const data = await response.json()

  if (response.status !== 200) {
    throw new Error(data.message)
  }

  return data
}