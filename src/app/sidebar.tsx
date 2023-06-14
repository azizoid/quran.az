'use client'
import dynamic from 'next/dynamic'

export const PrayerWidget = dynamic(
  () => import('@/components/sidebar/prayer.widget').then((res) => res.PrayerWidget),
  { ssr: false }
)
export const RandomAyah = dynamic(
  () => import('@/components/sidebar/randomayah').then((res) => res.RandomAyah),
  { ssr: false }
)
export const FacebookPage = dynamic(
  () => import('@/components/sidebar/facebook.page').then((res) => res.FacebookPage),
  { ssr: false }
)

export const Sidebar = () => (
  <div className="col-span-12 lg:col-span-4 mx-4 text-small flex flex-col justify-items-start space-y-4">
    <PrayerWidget />
    <hr />
    <RandomAyah />
    <hr />
    <FacebookPage />
  </div>
)
