export const calculatePageBounds = (
  activePage: number,
  totalPages: number,
  pageRangeDisplayed: number
) => {
  const halfRange = Math.floor(pageRangeDisplayed / 2)
  let startPage = Math.max(1, activePage - halfRange)
  let endPage = Math.min(totalPages, activePage + halfRange)

  if (activePage - startPage < halfRange) {
    const extendLength = halfRange - (activePage - startPage)
    endPage = Math.min(totalPages, endPage + extendLength)
  }

  if (endPage - activePage < halfRange) {
    const extendLength = halfRange - (endPage - activePage)
    startPage = Math.max(1, startPage - extendLength)
  }

  return { startPage, endPage }
}
