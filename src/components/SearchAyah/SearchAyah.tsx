import Link from 'next/link'
import { FaExternalLinkAlt } from 'react-icons/fa'

import Highlighter from 'react-highlight-words'

import { Sajda } from '@/ui'
import { DisplayData } from 'src/lib/types'

export type SearchAyahProps = {
  data: DisplayData
  sajda?: number[]
  mark?: string
}

export const SearchAyah = ({ data, sajda, mark = '' }: SearchAyahProps): JSX.Element => (
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
    <Link href={`/${data.soorah}/${data.ayah}?t=${data.translator}`} className="read-ayah">
      <FaExternalLinkAlt />
    </Link>
  </li>
)
