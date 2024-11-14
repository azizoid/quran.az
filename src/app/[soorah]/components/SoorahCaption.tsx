import Link from 'next/link'

import { SOORAH_LIST } from '@/assets/soorah-list-object'
import { CityAndSize } from '@/components/CityAndSize'
import { buildUrl } from '@/helpers/buildUrl'

type SoorahCaptionProps = {
  soorah: number
  translator: number
}

export const SoorahCaption = ({ soorah, translator }: SoorahCaptionProps) => {
  const { fullTitle, city, ayahCount } = SOORAH_LIST[soorah] || {}

  return (
    <li
      className="flex justify-center items-center text-center text-lg md:text-2xl font-thin whitespace-nowrap text-gray-400 hover:text-black before:mr-2 after:ml-2
      before:content-[url('/img/caption-left.png')] after:content-[url('/img/caption-right.png')]"
    >
      <Link
        href={buildUrl(soorah, undefined, translator)}
        className="text-gray-400 hover:text-black decoration-1"
        prefetch={false}
      >
        {`${soorah}. ${fullTitle}`}
        <span className="flex flex-row justify-center gap-1 text-xs">
          <CityAndSize city={city} ayahCount={ayahCount} size="sm" />
        </span>
      </Link>
    </li>
  )
}
