import Link from 'next/link'

import { sirasayi } from 'sirasayi'

import { SOORAH_LIST } from '@/assets/soorah-list-object'

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
          prefetch={false}
        >
          {sirasayi(prev)} {SOORAH_LIST[prev]['fullTitle']}
        </Link>
      )}
      <span className="pagination-disabled flex flex-col text-center">
        {sirasayi(soorah)} {SOORAH_LIST[soorah]['fullTitle']}
      </span>
      {next !== null && (
        <Link
          href={`/${next}?t=${translator}`}
          className="pagination-item flex flex-col text-center"
          prefetch={false}
        >
          {sirasayi(next)} {SOORAH_LIST[next]['fullTitle']}
        </Link>
      )}
    </div>
  )
}
