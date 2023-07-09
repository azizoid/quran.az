import { render, screen } from '@testing-library/react'

import { PaginateAyah } from './PaginateAyah'

describe('PaginateAyah', () => {
  const mockProps = {
    soorah: 2,
    ayah: 5,
    translator: 1,
  }

  test('renders pagination links correctly', () => {
    render(<PaginateAyah {...mockProps} />)

    const prevLink = screen.getByText('4')
    const ayahText = screen.getByText('5')
    const nextLink = screen.getByText('6')

    expect(prevLink).toBeInTheDocument()
    expect(prevLink.getAttribute('href')).toBe('/2/4?t=1')

    expect(ayahText).toBeInTheDocument()

    expect(nextLink).toBeInTheDocument()
    expect(nextLink.getAttribute('href')).toBe('/2/6?t=1')
  })

  test('renders the first ayah when prev Soorah is available', () => {
    render(<PaginateAyah {...({ ...mockProps, soorah: 2, ayah: 1 })} />)

    const ayahText = screen.getByText('1')
    const prevSoorahLink = screen.getByRole('link', { name: '1. əl-Fatihə surəsi ←' })
    const nextLink = screen.getByRole('link', { name: '2' })

    expect(ayahText).toHaveClass('pagination-disabled')
    expect(prevSoorahLink).toBeInTheDocument()

    expect(nextLink).toBeInTheDocument()
  })

  test('renders the last ayah when nextSoorah is available', () => {
    render(<PaginateAyah {...({ ...mockProps, soorah: 1, ayah: 7 })} />)

    const ayahText = screen.getByText('7')
    const prevSoorahLink = screen.getByRole('link', { name: '6' })
    const nextLink = screen.getByRole('link', { name: '2. əl-Bəqərə surəsi →' })

    expect(ayahText).toHaveClass('pagination-disabled')
    expect(prevSoorahLink).toBeInTheDocument()

    expect(nextLink).toBeInTheDocument()
  })
})