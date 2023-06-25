import Link from 'next/link'

export type PaginateAyahProps = {
  soorah: number
  ayah: number
  prev?: number | null
  next?: number | null
  prevSoorah?: string | null
  nextSoorah?: string | null
  translator?: number
}

export const PaginateAyah = ({
  soorah,
  ayah,
  prev,
  prevSoorah,
  next,
  nextSoorah,
  translator,
}: PaginateAyahProps): JSX.Element => (
  <div className="pagination">
    {prevSoorah ? (
      <Link
        href={`/${soorah - 1}?t=${translator}`}
        className="pagination-item"
        prefetch={false}
      >
        {`${soorah - 1}. ${prevSoorah}`} &larr;
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
