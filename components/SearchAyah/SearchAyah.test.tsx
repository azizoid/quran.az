import React from 'react'
import { render } from '@testing-library/react'
import {SearchAyah} from './SearchAyah'

test("SearchAyah Snapshot", () =>{
  const {container, getByText} = render(<SearchAyah data={{
    soorah:2,
    ayah:1,
    content:"Alif Lam Mim",
    translator:1,
  }} mark="Lam" />)

  expect(getByText('Lam')).toHaveClass('bg-warning')

  expect(container).toMatchSnapshot()
})