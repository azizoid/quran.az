import soorahListObject from "../../assets/soorah-list-object"
import styles from "./SoorahCaption.module.css"

export type SoorahCaptionProps = {
  soorah: number
  ayahCount?: number // TODO
}

export const SoorahCaption = ({ soorah }: SoorahCaptionProps): JSX.Element => (
  <li
    className={`ayah-list-item text-center text-lg md:text-2xl font-thin ${styles.header} flex align-middle justify-center`}
  >
    {soorahListObject[soorah]["fullTitle"]} surəsi
  </li>
)
