export const calculatePageBounds = (
  activePage: number,
  totalPages: number,
  pageRangeDisplayed: number
) => {
  let startPage = Math.max(1, activePage - Math.floor(pageRangeDisplayed / 2))
  let endPage = Math.min(totalPages, activePage + Math.floor(pageRangeDisplayed / 2))

  if (activePage - startPage < Math.floor(pageRangeDisplayed / 2)) {
    endPage = Math.min(totalPages, endPage + (startPage - activePage))
  }

  if (endPage - activePage < Math.floor(pageRangeDisplayed / 2)) {
    startPage = Math.max(1, startPage - (endPage - activePage))
  }

  return { startPage, endPage }
}
