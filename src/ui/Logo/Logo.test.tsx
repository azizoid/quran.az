import { render } from '@testing-library/react'

import { Logo } from './Logo'

test('Render Logo', () => {
  const { container } = render(<Logo />)

  expect(container).toMatchSnapshot()
})
