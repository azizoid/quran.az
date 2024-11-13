import Link from 'next/link'

import { ExternalLink } from 'lucide-react'

import { Sajda } from '@/components/Sajda/Sajda'
import { buildUrl } from '@/helpers/buildUrl'
import { DisplayData } from '@/helpers/types'


export type SoorahAyahProps = {
  data: DisplayData
  sajda?: number[]
}

export const SoorahAyahTemplate = ({ data, sajda }: SoorahAyahProps) => (
  <li className="soorah-list-item">
    <div className="flex flex-row">
      <span className="badge">
        {data.ayah}
        {sajda?.includes(data.ayah) && <Sajda />}
      </span>
      <span>{data.content}</span>
    </div>
    <Link
      href={buildUrl(data.soorah, data.ayah, data.translator)}
      className="read-ayah"
      prefetch={false}
      title="oxu"
    >
      <ExternalLink />
    </Link>
  </li>
)
