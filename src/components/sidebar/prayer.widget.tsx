import useSWR from 'swr'

import { fetcher } from '@/utility'
import { LoaderProgress } from 'src/ui'

export const PrayerWidget = (): JSX.Element => {
  const { data, isLoading, error: isError } = useSWR(
    'https://nam.az/api/v1/1', fetcher, {
    revalidateOnMount: true,
    dedupingInterval: 60 * 60 * 1000, // TTL of 1 hour
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
