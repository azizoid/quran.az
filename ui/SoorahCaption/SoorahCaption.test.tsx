import { render } from '@testing-library/react'
import { SoorahCaption } from './SoorahCaption'

test('SooranCaption snapshot', () => {
  const { container } = render(<SoorahCaption soorah={112} translator={2} />)

  expect(container).toMatchSnapshot()
})
