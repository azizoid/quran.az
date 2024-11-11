import { render, screen } from '@testing-library/react'

import { ColoredText, coloredTextcolors } from './ColoredText'

test('render Component', () => {
  const { container } = render(
    <ColoredText content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed" />
  )

  expect(screen.getByText('Lorem')).toHaveStyle(`color:${coloredTextcolors[0]}`)
  expect(screen.getByText('amet,')).toHaveStyle(`color:${coloredTextcolors[4]}`)
  expect(screen.getByText('consectetur')).toHaveStyle(`color:${coloredTextcolors[5]}`)
  expect(screen.getByText('sed')).toHaveStyle(`color:${coloredTextcolors[0]}`)

  expect(container).toMatchSnapshot()
})
