import { render, screen } from '@testing-library/react'

import { SoorahAyah } from './SoorahAyah'

test('SoorahAyah Snapshot', () => {
  const { container } = render(
    <SoorahAyah
      data={{
        soorah: 96,
        ayah: 1,
        content: 'Yaradan Rəbbinin adı ilə oxu!',
        translator: 4,
      }}
    />
  )

  expect(container).toMatchSnapshot()
})

test.skip('SoorahAyah Sajda', () => {
  render(
    <SoorahAyah
      data={{
        soorah: 7,
        ayah: 206,
        content: 'Yaradan Rəbbinin adı ilə oxu!',
        translator: 4,
      }}
      sajda={[206]}
    />
  )

  expect(screen.getByText('Səcdə ayəsi')).toBeInTheDocument()
})
