import { FC } from 'react'

interface PaginationProps {
  activePage: number
  itemsCountPerPage: number
  totalItemsCount: number
  pageRangeDisplayed: number
  onChange: (page: number) => void
  hideDisabled?: boolean
}

export const Pagination: FC<PaginationProps> = ({
  activePage,
  itemsCountPerPage,
  totalItemsCount,
  pageRangeDisplayed,
  onChange,
  hideDisabled = true,
}) => {
  const totalPages = Math.ceil(totalItemsCount / itemsCountPerPage)
  const isFirstPage = activePage === 1
  const isLastPage = activePage === totalPages

  const handleClick = (page: number) => {
    if (page !== activePage) {
      onChange(page)
    }
  }

  return (
    <ul className="pagination">
      {!isFirstPage && (
        <li className="pagination-item" onClick={() => handleClick(totalPages)}>
          «
        </li>
      )}

      {(activePage > 1 || !hideDisabled) && (
        <li
          className={`pagination-item ${isFirstPage && 'pagination-disabled'}`}
          onClick={() => !hideDisabled && handleClick(activePage - 1)}
        >
          ⟨
        </li>
      )}

      {Array.from({ length: Math.min(pageRangeDisplayed, totalPages) }, (_, i) => i + 1).map(
        (page) => (
          <li
            key={page}
            className={`pagination-item ${activePage === page && 'pagination-active'}`}
            onClick={() => handleClick(page)}
          >
            {page}
          </li>
        )
      )}

      {(activePage < totalPages || !hideDisabled) && (
        <li
          className={`pagination-item ${isLastPage && 'pagination-disabled'}`}
          onClick={() => !hideDisabled && handleClick(activePage + 1)}
        >
          ⟩
        </li>
      )}

      {!isLastPage && (
        <li className="pagination-item" onClick={() => handleClick(totalPages)}>
          »
        </li>
      )}
    </ul>
  )
}
