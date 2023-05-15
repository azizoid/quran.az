import { render } from '@testing-library/react'

import { LoaderProgress } from './LoaderProgress'

test('render the snapshot of LoaderProgress', () => {
  const { container } = render(<LoaderProgress />)

  expect(container).toMatchSnapshot()
})
