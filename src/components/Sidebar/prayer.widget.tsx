'use client'
import { MapPinnedIcon } from 'lucide-react'
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
      <div className="w-full text-sm">
        <div className="flex w-full items-center justify-evenly bg-gray-700 px-4 py-2 text-white">
          <div className="text-center">{`${hijri}, ${cityName}`}</div>
          <a href="https://nam.az" target="_blank" rel="noreferrer">
            <MapPinnedIcon size={14} className="text-green-300" />
          </a>
        </div>

        <div className="grid grid-cols-2 divide-y lg:grid-cols-3">
          {prayers.map((prayerTime, index) => (
            <div key={index} className="flex place-content-center gap-2 p-2 hover:bg-gray-100">
              <span className="text-right">{prayersTitle[index]}</span>
              <span className="">{prayerTime}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
