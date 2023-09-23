import { render, screen } from '@testing-library/react'

import { PaginateSoorahList } from './PaginateSoorahList'

test('PaginateSoorahList Snapshot', () => {
  const { container } = render(<PaginateSoorahList soorah={1} translator={1} />)

  expect(screen.getByText('1-ci əl-Fatihə surəsi')).toBeInTheDocument()
  expect(screen.getByText('2-ci əl-Bəqərə surəsi')).toBeInTheDocument()

  expect(container).toMatchSnapshot()
})

test('PaginateSoorahList Snapshot', () => {
  const { container } = render(<PaginateSoorahList soorah={114} translator={1} />)

  expect(screen.getByText('113-cü əl-Fələq surəsi')).toBeInTheDocument()
  expect(screen.getByText('114-cü əl-Nas surəsi')).toBeInTheDocument()

  expect(container).toMatchSnapshot()
})
