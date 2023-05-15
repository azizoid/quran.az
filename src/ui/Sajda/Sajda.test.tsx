import { render } from '@testing-library/react'

import { Sajda } from './Sajda'

test('Render Sajda', () => {
  const { container } = render(<Sajda />)

  expect(container).toMatchSnapshot()
})
