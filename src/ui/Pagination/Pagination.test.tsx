import { fireEvent, render, screen } from '@testing-library/react'

import { Pagination, PaginationProps } from './Pagination'

describe('Pagination component', () => {
  const defaultProps: PaginationProps = {
    activePage: 1,
    itemsCountPerPage: 10,
    totalItemsCount: 100,
    pageRangeDisplayed: 5,
    onChange: jest.fn(),
  }

  it('renders without crashing', () => {
    const { container } = render(<Pagination {...defaultProps} />)
    expect(container).toBeInTheDocument()
  })

  it('renders first and last pagination items', () => {
    render(<Pagination {...defaultProps} />)
    expect(screen.queryByText('«')).not.toBeInTheDocument()
    expect(screen.getByText('»')).toBeInTheDocument()
  })

  it('triggers onChange when a pagination item is clicked', () => {
    render(<Pagination {...defaultProps} />)
    fireEvent.click(screen.getByText('2'))
    expect(defaultProps.onChange).toHaveBeenCalledWith(2)
  })

  it('renders correct range of pagination items', () => {
    const customProps = {
      ...defaultProps,
      totalItemsCount: 225,
      activePage: 8,
    }

    render(<Pagination {...customProps} />)
    expect(screen.queryByText('1')).not.toBeInTheDocument()
    expect(screen.queryByText('2')).not.toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('6')).toBeInTheDocument()
    expect(screen.getByText('7')).toBeInTheDocument()
    expect(screen.getByText('8')).toBeInTheDocument()
    expect(screen.getByText('9')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.queryByText('11')).not.toBeInTheDocument()
  })
})
