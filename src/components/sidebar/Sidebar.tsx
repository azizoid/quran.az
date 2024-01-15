'use client'

import { FacebookPage } from './facebook.page'
import { PrayerWidget } from './prayer.widget'
import { RandomAyah } from './randomayah'

export const Sidebar = () => (
  <div className="col-span-12 lg:col-span-4 mx-4 text-small flex flex-col justify-items-start space-y-4">
    <PrayerWidget />
    <hr />
    <RandomAyah />
    <hr />
    <FacebookPage />
  </div>
)
