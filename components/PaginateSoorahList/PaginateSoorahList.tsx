import Link from 'next/link'

import { SOORAH_LIST } from '@/assets/soorah-list-object'
import { numberSuffixAz } from '@/utility'

export type PaginateSoorahListProps = {
  soorah: number
  translator: number
}

export const PaginateSoorahList = ({
  soorah,
  translator,
}: PaginateSoorahListProps): JSX.Element => {
  const prev = soorah === 1 ? null : soorah - 1
  const next = soorah === 114 ? null : soorah + 1

  return (
    <div className="pagination">
      {prev !== null && (
        <Link
          href={`/${prev}?t=${translator}`}
          className="pagination-item flex flex-col text-center"
        >
          {numberSuffixAz(prev)} {SOORAH_LIST[prev]['fullTitle']}
        </Link>
      )}
      <span className="pagination-disabled flex flex-col text-center">
        {numberSuffixAz(soorah)} {SOORAH_LIST[soorah]['fullTitle']}
      </span>
      {next !== null && (
        <Link
          href={`/${next}?t=${translator}`}
          className="pagination-item flex flex-col text-center"
        >
          {numberSuffixAz(next)} {SOORAH_LIST[next]['fullTitle']}
        </Link>
      )}
    </div>
  )
}
