import { FaKaaba, FaMosque } from 'react-icons/fa'

import { IconType } from 'react-icons'

import { TanzilCityType } from '@/helpers/types'

const iconSizes = {
  sm: 16,
  md: 18,
}

const cityList: Record<
  TanzilCityType,
  {
    Icon: IconType
    title: string
  }
> = {
  Mecca: {
    Icon: FaKaaba,
    title: 'Məkkə surəsi',
  },
  Medina: {
    Icon: FaMosque,
    title: 'Mədinə surəsi',
  },
}

export type RevealPlaceProps = {
  city: TanzilCityType
  size?: keyof typeof iconSizes
}

export const RevealPlace = ({ city, size = 'md' }: RevealPlaceProps) => {
  const { Icon, title } = cityList[city]

  return (
    <span className="flex gap-1 whitespace-nowrap align-middle">
      <Icon size={iconSizes[size]} className="text-gray-300 group-hover:text-gray-600" />
      {title}
    </span>
  )
}
