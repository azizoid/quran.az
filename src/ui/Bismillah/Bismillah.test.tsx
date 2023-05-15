import { render } from '@testing-library/react'
import { Bismillah } from './Bismillah'

test('Render Bismillah', () => {
  const { container } = render(<Bismillah />)

  expect(container).toMatchSnapshot()
})
