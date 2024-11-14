'use client'
import useSWR from 'swr'

import { fetcher } from '@/utility/fetcher'

import { LoaderDots } from '../LoaderDots'

export type PrayerReturnProps = {
  cityName: string
  hijri: string
  prayers: string[]
}

const prayerApi = 'https://nam.az/api/v3/baki'
const prayersTitle = ['Fəcr', 'Günəş', 'Zöhr', 'Əsr', 'Məğrib', 'İşa']

export const PrayerWidget = () => {
  const {
    data,
    isLoading,
    error: isError,
  } = useSWR<PrayerReturnProps>([prayerApi, 'prayerWidget'], fetcher, {
    revalidateOnMount: true,
    dedupingInterval: 60 * 60 * 1000, // TTL of 1 hour
  })

  if (isLoading || isError || !data) {
    return <LoaderDots />
  }

  const { cityName, hijri, prayers } = data

  return (
    <>
      <table className="w-full table-auto text-sm" cellPadding={7}>
        <thead className="bg-gray-700 text-white">
          <tr>
            <td align="center" colSpan={3}>
              {`${hijri}, ${cityName}`}
            </td>
            <td align="center">
              <a href="https://nam.az" target="_blank" rel="noreferrer" className="text-green-300">
                <u>Digər şəhərlər</u>
              </a>
            </td>
          </tr>
        </thead>
        <tbody>
          {[0, 2, 4].map((index) => (
            <tr key={index}>
              <td align="right">{prayersTitle[index]}</td>
              <td>{prayers[index]}</td>
              <td align="right">{prayersTitle[index + 1]}</td>
              <td>{prayers[index + 1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
