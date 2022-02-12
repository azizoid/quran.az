import Link from "next/link"
import soorahListObject from "../../assets/soorah-list-object"
import styles from "./SoorahCaption.module.css"

export type SoorahCaptionProps = {
  soorah: number
  translator: number
  ayahCount?: number // TODO
}

export const SoorahCaption = ({
  soorah,
  translator,
}: SoorahCaptionProps): JSX.Element => (
  <li
    className={`ayah-list-item text-center text-lg md:text-2xl font-thin ${styles.header} flex align-middle justify-center`}
  >
    <Link href={`/${soorah}?t=${translator}`}>
      <a className="transform hover:-translate-y-1">
        {soorahListObject[soorah]["fullTitle"]} surəsi
      </a>
    </Link>
  </li>
)
