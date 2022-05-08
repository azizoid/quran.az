import Link from 'next/link'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { DisplayData } from '@/lib/types'
import { Sajda } from 'ui/Sajda/Sajda'

export type SoorahAyahProps = {
  data: DisplayData
  sajda?: number[]
}

export const SoorahAyah = ({ data, sajda }: SoorahAyahProps): JSX.Element => (
  <li className="soorah-list-item">
    <div className="flex flex-row">
      <span className="badge">{data.ayah}</span>
      <span>
        {data.content} {sajda?.includes(data.ayah) && <Sajda />}
      </span>
    </div>
    <Link href={`/${data.soorah}/${data.ayah}?t=${data.translator}`}>
      <a className="read-ayah">
        <FaExternalLinkAlt />
      </a>
    </Link>
  </li>
)
