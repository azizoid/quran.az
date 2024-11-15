import { RevealPlace, RevealPlaceProps } from './RevealPlace'

interface CityAndSizeProps extends RevealPlaceProps {
  ayahCount: number
}

export const CityAndSize = ({ city, ayahCount, size = 'sm' }: CityAndSizeProps) => (
  <>
    <RevealPlace city={city} size={size} />
    <span>{'/'}</span>
    <span>{ayahCount} ayə</span>
  </>
)
