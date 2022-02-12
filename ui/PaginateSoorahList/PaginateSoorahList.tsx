import Link from "next/link"
import soorah_list_object from "../../assets/soorah-list-object"

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
        <Link href={`/${prev}?t=${translator}`}>
          <a className="pagination-item">
            {prev}. {soorah_list_object[prev]["fullTitle"]}
          </a>
        </Link>
      )}
      <span className="pagination-disabled">
        {soorah}. {soorah_list_object[soorah]["fullTitle"]}
      </span>
      {next !== null && (
        <Link href={`/${next}?t=${translator}`}>
          <a className="pagination-item">
            {next} {soorah_list_object[next]["fullTitle"]}
          </a>
        </Link>
      )}
    </div>
  )
}
