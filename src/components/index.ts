import dynamic from 'next/dynamic'

export * from './Empty/Empty'
export * from './Form/Form'
export * from './PaginateAyah/PaginateAyah'
export * from './PaginateSoorahList/PaginateSoorahList'
export * from './SearchAyah/SearchAyah'
export * from './SoorahAyah/SoorahAyah'
export * from './SoorahList/SoorahList'

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