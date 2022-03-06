import React from 'react'
import {render} from '@testing-library/react'

import { ColoredText, coloredTextcolors } from './ColoredText'

test("render Component", ()=>{
  const { container, getByText} = render(<ColoredText content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed' />)

  expect(getByText('Lorem')).toHaveStyle(`color:${coloredTextcolors[0]}`)
  expect(getByText('amet,')).toHaveStyle(`color:${coloredTextcolors[4]}`)
  expect(getByText('consectetur')).toHaveStyle(`color:${coloredTextcolors[5]}`)
  expect(getByText('sed')).toHaveStyle(`color:${coloredTextcolors[0]}`)

  expect(container).toMatchSnapshot()
})