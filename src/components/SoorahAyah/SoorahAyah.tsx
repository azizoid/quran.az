import Link from 'next/link'
import { FaExternalLinkAlt } from 'react-icons/fa'

import { DisplayData } from 'src/lib/types'
import { Sajda } from 'src/ui'

export type SoorahAyahProps = {
  data: DisplayData
  sajda?: number[]
}

export const SoorahAyah = ({ data, sajda }: SoorahAyahProps): JSX.Element => (
  <li className="soorah-list-item">
    <div className="flex flex-row">
      <span className="badge">
        {data.ayah}
        {sajda?.includes(data.ayah) && <Sajda />}
      </span>
      <span>{data.content}</span>
    </div>
    <Link href={`/${data.soorah}/${data.ayah}?t=${data.translator}`} className="read-ayah">
      <FaExternalLinkAlt />
    </Link>
  </li>
)
