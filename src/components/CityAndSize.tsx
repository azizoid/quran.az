import { FaKaaba, FaMosque } from 'react-icons/fa'

import { IconType } from 'react-icons'

const iconSizes = {
  sm: 16,
  md: 18,
}

const cityList = {
  Mecca: {
    Icon: FaKaaba,
    title: 'Məkkə surəsi',
  },
  Medina: {
    Icon: FaMosque,
    title: 'Mədinə surəsi',
  },
}

const CityFormatted = (Icon: IconType, title: string, size: number) => (
  <span className="flex gap-1 align-middle whitespace-nowrap">
    <Icon size={size} className="text-gray-300 group-hover:text-gray-600" />
    {title}
  </span>
)

type CityAndSizeProps = {
  city: keyof typeof cityList
  ayahCount: number
  size?: keyof typeof iconSizes
}

export const CityAndSize = ({ city, ayahCount, size = 'sm' }: CityAndSizeProps) => (
  <>
    {CityFormatted(cityList[city].Icon, cityList[city].title, iconSizes[size])}
    <span>{'/'}</span>
    <span>{ayahCount} ayə</span>
  </>
)
