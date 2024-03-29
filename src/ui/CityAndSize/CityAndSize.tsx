import { FaKaaba, FaMosque } from 'react-icons/fa'

const iconSizes = {
  sm: 16,
  md: 18,
} as const

type CityAndSizeProps = {
  city: string
  ayahCount: number
  devider?: boolean
  size?: 'sm' | 'md'
}

export const CityAndSize = ({
  city,
  ayahCount,
  devider = true,
  size = 'sm',
}: CityAndSizeProps): JSX.Element => (
  <>
    <span className="flex gap-1 align-middle whitespace-nowrap">
      {city === 'Mecca' ? (
        <>
          <FaKaaba size={iconSizes[size]} className="text-gray-300 group-hover:text-gray-600" />
          Məkkə surəsi
        </>
      ) : (
        <>
          <FaMosque size={iconSizes[size]} className="text-gray-300 group-hover:text-gray-600" />
          Mədinə surəsi
        </>
      )}
    </span>
    {devider ? '/' : null}
    <span>{ayahCount} ayə</span>
  </>
)
