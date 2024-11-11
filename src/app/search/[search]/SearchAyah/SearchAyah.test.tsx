import { render, screen } from '@testing-library/react'

import { SearchAyah } from './SearchAyah'

test('SearchAyah with mark word', () => {
  render(
    <SearchAyah
      data={{
        id: 'fakeId',
        soorah: 2,
        ayah: 1,
        content: 'Alif Lam Mim',
        translator: 1,
      }}
      mark="Lam"
    />
  )

  expect(screen.getByText('Lam')).toHaveClass('bg-warning')
})

test('SearchAyah without mark word', () => {
  const { container } = render(
    <SearchAyah
      data={{
        id: 'fakeId2',
        soorah: 2,
        ayah: 1,
        content: 'Alif Lam Mim',
        translator: 1,
      }}
    />
  )

  expect(container).toMatchSnapshot()
})

test.skip('SearchAyah with Sajda', () => {
  render(
    <SearchAyah
      data={{
        id: 'fakeId3',
        soorah: 96,
        ayah: 206,
        content: 'Alif Lam Mim',
        translator: 1,
      }}
      sajda={[206]}
    />
  )

  expect(screen.getByText('Səcdə ayəsi')).toBeInTheDocument()
})
