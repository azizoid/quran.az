import Link from "next/link"
import { FaExternalLinkAlt } from "react-icons/fa"
import { DisplayData } from "../../lib/types"

export type SoorahAyahProps = {
  data: DisplayData
}

export const SoorahAyah = ({ data }: SoorahAyahProps): JSX.Element => (
  <li className="soorah-list-item">
    <div>
      <span className="badge">{data.ayah}</span> {data.content}
    </div>
    <Link href={`/${data.soorah}/${data.ayah}?t=${data.translator}`}>
      <a className="read-ayah">
        <FaExternalLinkAlt />
      </a>
    </Link>
  </li>
)

export default SoorahAyah
