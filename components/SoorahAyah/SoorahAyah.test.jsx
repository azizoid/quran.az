import React from 'react'
import { render } from '@testing-library/react'
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
