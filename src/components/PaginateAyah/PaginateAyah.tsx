import { soorahList } from '@/assets/soorah-list-object'

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
        <PaginationLink href={`/${soorah - 1}?t=${translator}`}>{`${
          soorah - 1
        }. ${prevSoorah} ←`}</PaginationLink>
      )}
      {prevAyah && (
        <PaginationLink href={`/${soorah}/${prevAyah}?t=${translator}`}>{prevAyah}</PaginationLink>
      )}

      <span className="pagination-disabled">{ayah}</span>

      {nextAyah && (
        <PaginationLink href={`/${soorah}/${nextAyah}?t=${translator}`}>{nextAyah}</PaginationLink>
      )}
      {nextSoorah && (
        <PaginationLink href={`/${soorah + 1}?t=${translator}`}>{`${
          soorah + 1
        }. ${nextSoorah} →`}</PaginationLink>
      )}
    </div>
  )
}
