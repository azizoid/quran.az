'use client'
import dynamic from 'next/dynamic'

import { Form } from '@/components/Form/Form'

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

type MainLayoutProps = {
  children?: React.ReactNode
}

export const MainTemplate = ({ children }: MainLayoutProps) => (
  <div className="grid grid-cols-12">
    <div className="col-span-12 lg:col-span-7 mx-0 lg:mx-4">{children}</div>

    <div className="col-span-12 lg:col-span-4 mx-4 text-small flex flex-col justify-items-start space-y-4">
      {/* <PrayerWidget />
      <hr />
      <RandomAyah />
      <hr />
      <FacebookPage /> */}
      <hr />
    </div>
  </div>
)

export default MainTemplate
