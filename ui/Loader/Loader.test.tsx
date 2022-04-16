import { render } from '@testing-library/react'
import { Loader } from './Loader'

test('Render Loader', () => {
  const { container } = render(<Loader />)

  expect(container).toMatchSnapshot()
})
