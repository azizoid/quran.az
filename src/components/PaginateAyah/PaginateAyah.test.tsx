import { render, screen } from '@testing-library/react'

import { PaginateAyah } from './PaginateAyah'

describe('PaginateAyah', () => {
  const mockProps = {
    soorah: 2,
    ayah: 5,
    prev: 4,
    next: 6,
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

  test('renders only current ayah when prev and next are null', () => {
    render(<PaginateAyah {...mockProps} prev={null} next={null} />)

    const ayahText = screen.getByText('5')
    const prevLink = screen.queryByText('4')
    const nextLink = screen.queryByText('6')

    expect(ayahText).toBeInTheDocument()
    expect(prevLink).not.toBeInTheDocument()
    expect(nextLink).not.toBeInTheDocument()
  })

  test('renders the first ayah when prev is null', () => {
    render(<PaginateAyah {...mockProps} prev={null} />)

    const ayahText = screen.getByText('5')
    const prevLink = screen.queryByText('4')
    const nextLink = screen.queryByText('6')

    expect(ayahText).toBeInTheDocument()
    expect(prevLink).not.toBeInTheDocument()
    expect(nextLink).toBeInTheDocument()
  })

  test('renders the first ayah when prevSoorah is available', () => {
    render(<PaginateAyah {...mockProps} next={null} prevSoorah="əl-Fatihə surəsi" />)

    const ayahText = screen.getByText('5')
    const prevLink = screen.queryByText('4')
    const prevSoorahLink = screen.getByText('1. əl-Fatihə surəsi ←')

    expect(ayahText).toBeInTheDocument()
    expect(prevLink).toBeInTheDocument()
    expect(prevSoorahLink).toBeInTheDocument()

    expect(prevLink).toBeInTheDocument()
  })

  test('renders the last ayah when nextSoorah is available', () => {
    render(<PaginateAyah {...mockProps} next={null} nextSoorah="Ali İmran surəsi" />)

    const ayahText = screen.getByText('5')
    const prevLink = screen.queryByText('4')
    const nextSoorahLink = screen.getByText('3. Ali İmran surəsi →')

    expect(ayahText).toBeInTheDocument()
    expect(prevLink).toBeInTheDocument()
    expect(nextSoorahLink).toBeInTheDocument()

    expect(prevLink).toBeInTheDocument()
  })

})