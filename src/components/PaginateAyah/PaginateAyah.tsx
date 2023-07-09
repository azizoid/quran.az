import Link from 'next/link'

import { soorahList } from '@/assets/soorah-list-object'

export type PaginateAyahProps = {
  soorah: number
  ayah: number
  prev?: number | null
  next?: number | null
  translator?: number
}

export const PaginateAyah = ({
  soorah,
  ayah,
  prev,
  next,
  translator,
}: PaginateAyahProps): JSX.Element => {

  const prevSoorah = !prev && soorah > 1 ? soorahList.find((soorahItem) => soorahItem.id === Number(soorah - 1))?.fullTitle : null
  const nextSoorah = !next && soorah < 114 ? soorahList.find((soorahItem) => soorahItem.id === Number(soorah + 1))?.fullTitle : null

  return (
    <div className="pagination">
      {prevSoorah ? (
        <Link
          href={`/${soorah - 1}?t=${translator}`}
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
      ) : null
      }

      {nextSoorah ? (
        <Link
          href={`/${soorah + 1}?t=${translator}`}
          className="pagination-item"
          prefetch={false}
        >
          {`${soorah + 1}. ${nextSoorah}`} &rarr;
        </Link>
      ) : null}
    </div>
  )
}