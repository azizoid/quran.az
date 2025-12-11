import { NotebookTextIcon } from 'lucide-react'
import type { ReactNode } from 'react'

import { Link } from '@/components/Link'
import { Sajda } from '@/components/Sajda'
import { buildUrl } from '@/helpers/buildUrl'
import type { DisplayData } from '@/helpers/types'

export type SearchAyahProps = {
  data: DisplayData
  variant?: 'full' | 'short'
  sajda?: number[]
  content?: ReactNode
}

export const TemplateAyahList = ({ variant = 'full', data, sajda, content }: SearchAyahProps) => (
  <li className="soorah-list-item">
    <div className="flex flex-row">
      <span className="badge">
        {variant === 'full' ? `${data.soorah}:${data.ayah}` : data.ayah}
        {sajda?.includes(data.ayah) && <Sajda />}
      </span>
      {content ?? data.content}
    </div>
    <Link
      href={buildUrl(data.soorah, data.ayah, data.translator)}
      className="read-ayah"
      title="oxu"
    >
      <NotebookTextIcon />
    </Link>
  </li>
)
