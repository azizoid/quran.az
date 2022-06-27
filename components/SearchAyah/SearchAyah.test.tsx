import { render } from '@testing-library/react'
import { SearchAyah } from './SearchAyah'

test('SearchAyah with mark word', () => {
  const { getByText } = render(
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

  expect(getByText('Lam')).toHaveClass('bg-warning')
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

test('SearchAyah with Sajda', () => {
  const { getByText } = render(
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

  expect(getByText('Səcdə ayəsi')).toBeInTheDocument()
})
