'use client'

import { MapPinnedIcon } from 'lucide-react'
import useSWR from 'swr'
import { useMemo } from 'react'

import { fetcher } from '@/utility/fetcher'
import { LoaderDots } from '../LoaderDots'

export type PrayerTime = {
  name: string
  time: string
}

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

  const prayerTimes = useMemo(() => {
    if (!data?.prayers) return []
    return data.prayers.map((time, index) => ({
      name: prayersTitle[index],
      time,
    }))
  }, [data?.prayers])

  if (isLoading) {
    return <LoaderDots />
  }

  if (isError || !data) {
    return (
      <div className="w-full p-4 text-center text-red-500">
        Namaz vaxtları yüklənərkən xəta baş verdi
      </div>
    )
  }

  const { cityName, hijri } = data

  return (
    <div className="w-full text-sm" role="region" aria-label="Namaz vaxtları">
      <div className="flex w-full items-center justify-evenly bg-gray-700 px-4 py-2 text-white">
        <time dateTime={hijri} className="text-center">{`${hijri}, ${cityName}`}</time>
        <a
          href="https://nam.az"
          target="_blank"
          rel="noreferrer"
          aria-label="Namaz vaxtları mənbəyi"
        >
          <MapPinnedIcon size={14} className="text-green-300" />
        </a>
      </div>

      <div className="grid grid-cols-2 divide-y lg:grid-cols-3">
        {prayerTimes.map(({ name, time }) => (
          <div
            key={name}
            className="flex place-content-center gap-2 p-2 hover:bg-gray-100 border-b"
            role="listitem"
          >
            <span className="text-right font-medium">{name}</span>
            <time className="tabular-nums">{time}</time>
          </div>
        ))}
      </div>
    </div>
  )
}
