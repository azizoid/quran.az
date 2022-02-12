import soorahListObject from "../../assets/soorah-list-object"
import styles from "./SoorahCaption.module.css"

export type SoorahCaptionProps = {
  soorah: number
  ayahCount?: number // TODO
}

export const SoorahCaption = ({ soorah }: SoorahCaptionProps): JSX.Element => (
  <li
    className={`ayah-list-item text-center text-3xl font-thin ${styles.header}`}
  >
    {soorahListObject[soorah]["fullTitle"]} surəsi
  </li>
)
