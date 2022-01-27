import Link from "next/link"
import SOORAH_LIST from "../../assets/soorahList"

export type PaginateLinksProps = {
  soorah: number
  ayah: number
  prev?: number
  next?: number
  translator?: number
}

export const PaginateLinks = ({
  soorah,
  ayah,
  prev,
  next,
  translator,
}: PaginateLinksProps): JSX.Element => (
  <div className="pagination">
    <Link href={`/${soorah}?t=${translator}`}>
      <a className="pagination-item">{`Sura ${SOORAH_LIST[soorah]}`}</a>
    </Link>
    {prev !== null && (
      <Link href={`/${soorah}/${prev}?t=${translator}`}>
        <a className="pagination-item">{prev}</a>
      </Link>
    )}
    <span className="pagination-disabled">{ayah}</span>
    {next !== null && (
      <Link href={`/${soorah}/${next}?t=${translator}`}>
        <a className="pagination-item">{next}</a>
      </Link>
    )}
  </div>
)
