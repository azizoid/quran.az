import { soorahList } from '@/assets/soorah-list-object'
import { buildUrl } from '@/utility/buildUrl'

import { PaginationLink } from '../PaginationLink/PaginationLink'

export type PaginateAyahProps = {
  soorah: number
  ayah: number
  translator?: number
}

export const PaginateAyah = ({ soorah, ayah, translator }: PaginateAyahProps) => {
  const soorahIndex = soorah - 1

  const prevAyah = ayah === 1 ? null : ayah - 1
  const nextAyah = ayah === soorahList[soorahIndex]?.ayahCount ? null : ayah + 1

  const prevSoorah = !prevAyah && soorah > 1 ? soorahList[soorahIndex - 1]?.fullTitle : null
  const nextSoorah = !nextAyah && soorah < 114 ? soorahList[soorahIndex + 1]?.fullTitle : null

  return (
    <div className="pagination">
      {prevSoorah && (
        <PaginationLink href={buildUrl(soorah - 1, undefined, translator)}>
          {`${soorah - 1}. ${prevSoorah} ←`}
        </PaginationLink>
      )}
      {prevAyah && (
        <PaginationLink href={buildUrl(soorah, prevAyah, translator)}>{prevAyah}</PaginationLink>
      )}

      <span className="pagination-disabled">{ayah}</span>

      {nextAyah && (
        <PaginationLink href={buildUrl(soorah, nextAyah, translator)}>{nextAyah}</PaginationLink>
      )}
      {nextSoorah && (
        <PaginationLink href={buildUrl(soorah + 1, undefined, translator)}>
          {`${soorah + 1}. ${nextSoorah} →`}
        </PaginationLink>
      )}
    </div>
  )
}
