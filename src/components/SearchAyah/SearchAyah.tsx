import Link from 'next/link'
import { FaExternalLinkAlt } from 'react-icons/fa'

import Highlighter from 'react-highlight-words'

import { DisplayData } from '@/lib/types'
import { Sajda } from '@/ui/Sajda/Sajda'
import { buildUrl } from '@/utility/buildUrl'

export type SearchAyahProps = {
  data: DisplayData
  sajda?: number[]
  mark?: string
}

export const SearchAyah = ({ data, sajda, mark = '' }: SearchAyahProps) => (
  <li className="soorah-list-item">
    <div className="flex flex-row">
      <span className="badge">
        {data.soorah}:{data.ayah}
        {sajda?.includes(data.ayah) && <Sajda />}
      </span>{' '}
      <Highlighter
        searchWords={[mark]}
        textToHighlight={data.content}
        autoEscape={true}
        highlightClassName="bg-warning"
      />
    </div>
    <Link
      href={buildUrl(data.soorah, data.ayah, data.translator)}
      className="read-ayah"
      prefetch={false}
    >
      <FaExternalLinkAlt />
    </Link>
  </li>
)
