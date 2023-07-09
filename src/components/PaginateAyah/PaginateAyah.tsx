import Link from 'next/link'

import { soorahList } from '@/assets/soorah-list-object'

export type PaginateAyahProps = {
  soorah: number
  ayah: number
  translator?: number
}

export const PaginateAyah = ({
  soorah,
  ayah,
  translator,
}: PaginateAyahProps): JSX.Element => {

  const soorahToArrayIndex = soorah - 1

  const prev = ayah === 1 ? null : ayah - 1
  const next = ayah === soorahList[soorahToArrayIndex]?.ayahCount ? null : ayah + 1

  const prevSoorah = !prev && soorah > 1 ? soorahList[soorahToArrayIndex - 1]?.fullTitle : null
  const nextSoorah = !next && soorah < 114 ? soorahList[soorahToArrayIndex + 1]?.fullTitle : null

  return (
    <div className="pagination">
      {prevSoorah ? (
        <Link
          href={`/${soorah - 1}?t=${translator}`} // this logic has nothing to do with `soorahToArrayIndex`
          className="pagination-item"
          prefetch={false}
        >
          {`${soorah - 1}. ${prevSoorah} ←`}
        </Link>
      ) : null}

      {prev ? (
        <Link
          href={`/${soorah}/${prev}?t=${translator}`}
          className="pagination-item"
          prefetch={false}
        >
          {prev}
        </Link>
      ) : null}

      <span className="pagination-disabled">{ayah}</span>

      {next ? (
        <Link
          href={`/${soorah}/${next}?t=${translator}`}
          className="pagination-item"
          prefetch={false}
        >
          {next}
        </Link>
      ) : null}

      {nextSoorah ? (
        <Link
          href={`/${soorah + 1}?t=${translator}`}
          className="pagination-item"
          prefetch={false}
        >
          {`${soorah + 1}. ${nextSoorah} →`}
        </Link>
      ) : null}
    </div>
  )
}
