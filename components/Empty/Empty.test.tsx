import React from 'react'
import {render }from '@testing-library/react'
import {Empty} from './Empty'

test("Empty Snapshot", () =>{
  const {container} = render(<Empty />)

  expect(container).toMatchSnapshot()
})