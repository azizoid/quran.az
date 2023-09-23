import { calculatePageBounds } from './calculatePageBounds'

describe('calculatePageBounds', () => {
  test('should return correct start and end pages for first page', () => {
    const { startPage, endPage } = calculatePageBounds(1, 50, 5)
    expect(startPage).toBe(1)
    expect(endPage).toBe(5)
  })

  test('should return correct start and end pages for last page', () => {
    const { startPage, endPage } = calculatePageBounds(50, 50, 5)
    expect(startPage).toBe(46)
    expect(endPage).toBe(50)
  })

  test('should return correct start and end pages for middle page', () => {
    const { startPage, endPage } = calculatePageBounds(25, 50, 5)
    expect(startPage).toBe(23)
    expect(endPage).toBe(27)
  })

  test('should return correct start and end pages when totalPages is less than pageRangeDisplayed', () => {
    const { startPage, endPage } = calculatePageBounds(3, 5, 10)
    expect(startPage).toBe(1)
    expect(endPage).toBe(5)
  })

  test('should return correct start and end pages for pageRangeDisplayed less than 3', () => {
    const { startPage, endPage } = calculatePageBounds(25, 50, 1)
    expect(startPage).toBe(25)
    expect(endPage).toBe(25)
  })
})
