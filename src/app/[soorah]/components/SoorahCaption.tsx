import { SOORAH_LIST } from '@/assets/soorah-list-object'
import { CityAndSize } from '@/components/CityAndSize'
import { Link } from '@/components/Link'
import { buildUrl } from '@/helpers/buildUrl'

type SoorahCaptionProps = {
  soorah: number
  translator: number
}

export const SoorahCaption = ({ soorah, translator }: SoorahCaptionProps) => {
  const { fullTitle, city, ayahCount } = SOORAH_LIST[soorah] || {}

  return (
    <li className="flex items-center justify-center whitespace-nowrap text-center text-lg font-thin text-gray-400 before:mr-2 before:content-[url('/img/caption-left.png')] after:ml-2 after:content-[url('/img/caption-right.png')] hover:text-black md:text-2xl">
      <Link
        href={buildUrl(soorah, undefined, translator)}
        className="text-gray-400 decoration-1 hover:text-black"
      >
        {`${soorah}. ${fullTitle}`}
        <span className="flex flex-row justify-center gap-1 text-xs">
          <CityAndSize city={city} ayahCount={ayahCount} size="sm" />
        </span>
      </Link>
    </li>
  )
}
