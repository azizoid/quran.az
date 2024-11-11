import type { JSX } from 'react'

import { sirasayi } from 'sirasayi'

import { SOORAH_LIST } from '@/assets/soorah-list-object'
import { PaginationLink } from '@/components/PaginationLink/PaginationLink'
import { buildUrl } from '@/utility/buildUrl'

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
      {prev !== null ? (
        <PaginationLink
          href={buildUrl(prev, undefined, translator)}
          className="flex flex-col text-center"
        >
          {sirasayi(prev)} {SOORAH_LIST[prev]['fullTitle']}
        </PaginationLink>
      ) : null}

      <span className="pagination-disabled flex flex-col text-center">
        {sirasayi(soorah)} {SOORAH_LIST[soorah]['fullTitle']}
      </span>

      {next !== null ? (
        <PaginationLink
          href={buildUrl(next, undefined, translator)}
          className="flex flex-col text-center"
        >
          {sirasayi(next)} {SOORAH_LIST[next]['fullTitle']}
        </PaginationLink>
      ) : null}
    </div>
  )
}
