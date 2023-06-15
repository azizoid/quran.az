import Link from 'next/link'

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
}: PaginateAyahProps): JSX.Element => (
  <div className="pagination">
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
  </div>
)
