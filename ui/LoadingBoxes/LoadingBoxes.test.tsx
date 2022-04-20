import { render } from '@testing-library/react'
import { LoadingBoxes } from './LoadingBoxes'

test('Render LoadingBoxes', () => {
  const { container } = render(<LoadingBoxes />)

  expect(container).toMatchSnapshot()
})
