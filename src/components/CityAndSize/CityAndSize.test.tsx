import { render, screen, prettyDOM } from '@testing-library/react'

import { CityAndSize } from './CityAndSize'

test('Render CityAndSize', () => {
  const { container } = render(<CityAndSize city="Fatiha" ayahCount={7} devider={false} />)

  expect(container).toMatchSnapshot()
})

test('Render CityAndSize without devider', () => {
  render(<CityAndSize city="Fatiha" ayahCount={7} devider={true} />)

  const devider = screen.queryByText('/')

  expect(devider).toHaveTextContent('/')
})
