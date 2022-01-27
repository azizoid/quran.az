export const getApiData = async (url: string) =>
  await fetch(`${process.env.NEXT_PUBLIC_URL}${url}`)
    .then(response => {
      if (!response.ok) {
        // throw Error(response.statusText);
        // silently ignore
      }
      return response.json()
    }) //  workaround the catch 

