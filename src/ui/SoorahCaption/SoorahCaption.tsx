import Link from 'next/link'

import { SOORAH_LIST } from '@/assets/soorah-list-object'
import { CityAndSize } from '@/ui'
import { buildUrl } from '@/utility/buildUrl'

import styles from './SoorahCaption.module.css'

type SoorahCaptionProps = {
  soorah: number
  translator: number
}

export const SoorahCaption = ({ soorah, translator }: SoorahCaptionProps) => {
  const { fullTitle, city, ayahCount } = SOORAH_LIST[soorah] || {}

  return (
    <li
      className={`ayah-list-item text-center text-lg md:text-2xl font-thin ${styles.header} flex align-middle justify-center whitespace-nowrap`}
    >
      <Link
        href={buildUrl(soorah, undefined, translator)}
        className="text-gray-400 hover:text-black decoration-1"
        prefetch={false}
      >
        {`${soorah}. ${fullTitle}`}
        <span className="flex flex-row justify-center gap-1 text-xs">
          <CityAndSize city={city} ayahCount={ayahCount} devider={true} size="sm" />
        </span>
      </Link>
    </li>
  )
}
