import { render } from '@testing-library/react'
import { Footer } from './Footer'

test('Render Footer', () => {
  const { container } = render(<Footer />)

  expect(container).toMatchSnapshot()
})
