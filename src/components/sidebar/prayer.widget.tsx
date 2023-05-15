import { getDayOfYear } from 'date-fns'
import { useQuery } from 'react-query'

import { LoaderProgress } from 'src/ui'

const dayOfYear = getDayOfYear(new Date()) + 2

const fetchPrayersData = async (dayOfTheYear: number) => {
  const response = await fetch('https://nam.az/api/v1/1')
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const data = await response.json()

  return data
}

export const PrayerWidget = (): JSX.Element => {
  const { data, isLoading, isError } = useQuery(
    ['prayers', dayOfYear],
    () => fetchPrayersData(dayOfYear),
    {
      staleTime: 60000,
      cacheTime: 300000,
    }
  )

  if (isLoading || isError) {
    return (
      <div className="flex justify-center items-center">
        <LoaderProgress />
      </div>
    )
  }

  const { prayers } = data

  return (
    <table className="w-full table-auto text-sm" cellPadding={7}>
      <thead className="bg-gray-700 text-white">
        <tr>
          <td align="center" colSpan={3}>
            {`${data?.hijri}, Bakı`}
          </td>
          <td align="center">
            <a href="https://nam.az" target="_blank" rel="noreferrer" className="text-green-300">
              <u>Digər şəhərlər</u>
            </a>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td align="right">Fəcr</td>
          <td>{prayers[0]}</td>
          <td align="right">Günəş</td>
          <td>{prayers[1]}</td>
        </tr>
        <tr>
          <td align="right">Zöhr</td>
          <td>{prayers[2]}</td>
          <td align="right">Əsr</td>
          <td>{prayers[3]}</td>
        </tr>
        <tr>
          <td align="right">Məğrib</td>
          <td>{prayers[4]}</td>
          <td align="right">İşa</td>
          <td>{prayers[5]}</td>
        </tr>
      </tbody>
    </table>
  )
}
