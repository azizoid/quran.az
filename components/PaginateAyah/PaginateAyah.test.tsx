import { render } from '@testing-library/react'
import { PaginateAyah } from './PaginateAyah'

test('PaginateAyah Snapshot', async () => {
  const { container, getByText } = render(<PaginateAyah soorah={1} ayah={5} prev={4} next={6} />)

  expect(getByText('4')).toBeInTheDocument()
  expect(getByText('5')).toBeInTheDocument()
  expect(getByText('6')).toBeInTheDocument()

  expect(container).toMatchSnapshot()
})

test('PaginateAyah middle of ayah', async () => {
  const { queryByText } = render(<PaginateAyah soorah={1} ayah={7} prev={6} />)

  expect(queryByText('8')).not.toBeInTheDocument()
})
