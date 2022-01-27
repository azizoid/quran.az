export const getApiData = async (url: string) => {
  const fullUrl = `${process.env.NEXT_PUBLIC_URL}${url}`

  return await fetch(fullUrl)
    .then(response => {
      if (!response.ok) {
        // throw Error(response.statusText);
        // silently ignore
      }
      return response.json()
    }) //  workaround the catch 

}