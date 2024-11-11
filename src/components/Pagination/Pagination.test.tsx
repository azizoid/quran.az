import { fireEvent, render, screen } from '@testing-library/react'

import { Pagination, PaginationProps } from './Pagination'

describe('Pagination', () => {
  const baseProps: PaginationProps = {
    activePage: 1,
    itemsCountPerPage: 10,
    totalItemsCount: 100,
    pageRangeDisplayed: 5,
    onChange: jest.fn(),
  }

  test('should render first page item when activePage is 1', () => {
    const { queryByText } = render(<Pagination {...baseProps} />)
    expect(screen.queryByText('«')).not.toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  test('should render last page item when activePage is last page', () => {
    const props = {
      ...baseProps,
      activePage: 10,
    }
    const { queryByText } = render(<Pagination {...props} />)
    expect(screen.queryByText('»')).not.toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
  })

  test('should call onChange when a page item is clicked', () => {
    const onChange = jest.fn()
    const props = {
      ...baseProps,
      onChange,
    }
    const { getByText } = render(<Pagination {...props} />)
    fireEvent.click(screen.getByText('2'))
    expect(onChange).toHaveBeenCalledWith(2)
  })

  test('should not render first and last page items when they are in the page numbers', () => {
    const props = {
      ...baseProps,
      activePage: 5,
      pageRangeDisplayed: 10,
    }
    render(<Pagination {...props} />)
    expect(screen.queryByText('«')).not.toBeInTheDocument()
    expect(screen.queryByText('»')).not.toBeInTheDocument()
  })

  test('should render first and last page items when they are not in the page numbers', () => {
    const props = {
      ...baseProps,
      activePage: 5,
      pageRangeDisplayed: 5,
    }
    render(<Pagination {...props} />)
    expect(screen.getByText('«')).toBeInTheDocument()
    expect(screen.getByText('»')).toBeInTheDocument()
  })
})
