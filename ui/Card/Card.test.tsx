import React from 'react'
import { render } from '@testing-library/react'

import { Card } from './Card'

test("Card snapshot", ()=>{
  const { container } = render(<Card title="Dummy Title" />)

  expect(container).toMatchSnapshot()
})