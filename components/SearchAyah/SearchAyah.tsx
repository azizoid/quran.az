import Link from 'next/link'
import Highlighter from 'react-highlight-words'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { DisplayData } from '@/lib/types'

export type SearchAyahProps = {
  data: DisplayData
  mark?: string
}

export const SearchAyah = ({ data, mark = '' }: SearchAyahProps): JSX.Element => (
  <li className="soorah-list-item">
    <div className="text-start mx-1">
      <span className="badge">
        {data.soorah}:{data.ayah}
      </span>{' '}
      {data.content}
      <Highlighter
        searchWords={[mark]}
        textToHighlight={data.content}
        autoEscape={true}
        highlightClassName="bg-warning"
      />
    </div>
    <Link href={`/${data.soorah}/${data.ayah}?t=${data.translator}`}>
      <a className="read-ayah">
        <FaExternalLinkAlt />
      </a>
    </Link>
  </li>
)
