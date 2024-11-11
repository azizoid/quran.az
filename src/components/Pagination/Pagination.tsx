import { useMemo } from 'react'

import { calculatePageBounds } from '@/utility/calculatePageBounds/calculatePageBounds'

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

  const pageNumbers = useMemo(
    () => Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i),
    [startPage, endPage]
  )

  const handleClick = (page: number) => {
    if (page !== activePage) {
      onChange(page)
    }
  }

  return (
    <ul className="pagination">
      {!isFirstPage && !pageNumbers.includes(1) && (
        <li className="pagination-item" onClick={() => handleClick(1)}>
          «
        </li>
      )}

      {pageNumbers.map((page) => (
        <li
          key={page}
          className={`pagination-item ${activePage === page ? 'pagination-active' : ''}`}
          onClick={() => handleClick(page)}
        >
          {page}
        </li>
      ))}

      {!isLastPage && !pageNumbers.includes(totalPages) && (
        <li className="pagination-item" onClick={() => handleClick(totalPages)}>
          »
        </li>
      )}
    </ul>
  )
}
