import Link from 'next/link'

import { SOORAH_LIST } from 'src/assets/soorah-list-object'
import { CityAndSize } from 'src/ui'

import styles from './SoorahCaption.module.css'

export type SoorahCaptionProps = {
  soorah: number
  translator: number
}

export const SoorahCaption = ({ soorah, translator }: SoorahCaptionProps): JSX.Element => {
  const { fullTitle, city, ayahCount } = SOORAH_LIST[soorah]

  return (
    <li
      className={`ayah-list-item text-center text-lg md:text-2xl font-thin ${styles.header} flex align-middle justify-center whitespace-nowrap`}
    >
      <Link
        href={`/${soorah}?t=${translator}`}
        className="text-gray-400 hover:text-black decoration-1"
      >
        {`${soorah}. ${fullTitle}`}
        <span className="flex flex-row justify-center gap-1 text-xs">
          <CityAndSize city={city} ayahCount={ayahCount} devider={true} size="sm" />
        </span>
      </Link>
    </li>
  )
}