import { useMemo } from 'react'

import { calculatePageBounds } from '@/utility/calculatePageBounds'

export interface PaginationProps {
  activePage: number
  itemsCountPerPage: number
  totalItemsCount: number
  pageRangeDisplayed: number
  onChange: (page: number) => void
  hideDisabled?: boolean
}

export const Pagination = ({
  activePage,
  itemsCountPerPage,
  totalItemsCount,
  pageRangeDisplayed,
  onChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItemsCount / itemsCountPerPage)
  const isFirstPage = activePage === 1
  const isLastPage = activePage === totalPages

  const { startPage, endPage } = useMemo(
    () => calculatePageBounds(activePage, totalPages, pageRangeDisplayed),
    [activePage, totalPages, pageRangeDisplayed]
  )

  const handleClick = (page: number) => {
    if (page !== activePage) {
      onChange(page)
    }
  }

  return (
    <ul className="pagination">
      {!isFirstPage && (
        <li className="pagination-item" onClick={() => handleClick(1)}>
          «
        </li>
      )}

      {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
        <li
          key={page}
          className={`pagination-item ${activePage === page ? 'pagination-active' : ''}`}
          onClick={() => handleClick(page)}
        >
          {page}
        </li>
      ))}

      {!isLastPage && (
        <li className="pagination-item" onClick={() => handleClick(totalPages)}>
          »
        </li>
      )}
    </ul>
  )
}
