import Link from 'next/link'
import { SOORAH_LIST } from '@/assets/soorah-list-object'
import styles from './SoorahCaption.module.css'

export type SoorahCaptionProps = {
  soorah: number
  translator: number
  ayahCount?: number // TODO
}

export const SoorahCaption = ({ soorah, translator }: SoorahCaptionProps): JSX.Element => (
  <li
    className={`ayah-list-item text-center text-lg md:text-2xl font-thin ${styles.header} flex align-middle justify-center `}
  >
    <Link href={`/${soorah}?t=${translator}`}>
      <a className="text-gray-400 hover:text-black decoration-1">
        {`${soorah}. ${SOORAH_LIST[soorah]['fullTitle']}`}
      </a>
    </Link>
  </li>
)
