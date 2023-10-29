'use client'

import { PropsWithChildren } from 'react'

import { FacebookPage } from '@/components/sidebar/facebook.page'
import { PrayerWidget } from '@/components/sidebar/prayer.widget'
import { RandomAyah } from '@/components/sidebar/randomayah'

export const RootTemplate = ({ children }: PropsWithChildren) => (
  <div className="grid grid-cols-12">
    <div className="col-span-12 lg:col-span-7 mx-0 lg:mx-4">{children}</div>

    <div className="col-span-12 lg:col-span-4 mx-4 text-small flex flex-col justify-items-start space-y-4">
      <PrayerWidget />
      <hr />
      <RandomAyah />
      <hr />
      <FacebookPage />
    </div>
  </div>
)

export default RootTemplate
