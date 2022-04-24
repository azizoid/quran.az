import { render } from '@testing-library/react'
import { CityAndSize } from './CityAndSize'

test('Render CityAndSize', () => {
  const { container } = render(<CityAndSize city="Fatiha" ayahCount={7} devider={true} />)

  expect(container).toMatchSnapshot()
})
