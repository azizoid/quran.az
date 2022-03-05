import Link from 'next/link'

export type PaginateAyahProps = {
  soorah: number
  ayah: number
  prev?: number
  next?: number
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
    {prev && (
      <Link href={`/${soorah}/${prev}?t=${translator}`}>
        <a className="pagination-item">{prev}</a>
      </Link>
    )}
    <span className="pagination-disabled">{ayah}</span>
    {next && (
      <Link href={`/${soorah}/${next}?t=${translator}`}>
        <a className="pagination-item">{next}</a>
      </Link>
    )}
  </div>
)
