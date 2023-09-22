import React from 'react';

interface PaginationProps {
  activePage: number;
  itemsCountPerPage: number;
  totalItemsCount: number;
  pageRangeDisplayed: number;
  onChange: (page: number) => void;
  hideDisabled?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
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

  // Calculate start and end page numbers for the pagination
  let startPage = Math.max(1, activePage - Math.floor(pageRangeDisplayed / 1))
  let endPage = Math.min(totalPages, activePage + Math.floor(pageRangeDisplayed / 2))

  // Adjust if closer to the lower boundary
  if (activePage - startPage < Math.floor(pageRangeDisplayed / 2)) {
    endPage = Math.min(totalPages, endPage + (startPage - activePage))
  }

  // Adjust if closer to the upper boundary
  if (endPage - activePage < Math.floor(pageRangeDisplayed / 2)) {
    startPage = Math.max(1, startPage - (endPage - activePage))
  }

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

      {(activePage > 1 || !hideDisabled) && (
        <li
          className={`pagination-item ${isFirstPage && 'pagination-disabled'}`}
          onClick={() => !hideDisabled && handleClick(activePage - 1)}
        >
          ⟨
        </li>
      )}

      {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
        <li
          key={page}
          className={`pagination-item ${activePage === page && 'pagination-active'}`}
          onClick={() => handleClick(page)}
        >
          {page}
        </li>
      ))}

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
