import React from 'react'
import {render }from '@testing-library/react'
import {PaginateSoorahList} from './PaginateSoorahList'

test("PaginateSoorahList Snapshot", () =>{
  const {container, getByText} = render(<PaginateSoorahList soorah={1} translator={1} />)

  expect(getByText("1-ci əl-Fatihə surəsi")).toBeInTheDocument()
  expect(getByText("2-ci əl-Bəqərə surəsi")).toBeInTheDocument()

  expect(container).toMatchSnapshot()
})