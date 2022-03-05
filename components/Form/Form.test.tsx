import React from 'react'
import { render, fireEvent }from '@testing-library/react'
import { Form } from './Form'

test("Form Snapshot", () =>{
  const {container, getByRole, getAllByRole} = render(<Form />)

  expect(getAllByRole('combobox')).toHaveLength(2)
  expect(getByRole('spinbutton')).toBeInTheDocument()
  expect(getByRole('textbox')).toBeInTheDocument()
  expect(getByRole('button', {name:"Axtar"})).toBeInTheDocument()

  expect(container).toMatchSnapshot()
})

test("Reset Soorah and Ayah on Query enter", () => {
  const {getByRole, getByPlaceholderText, getAllByRole} = render(<Form />)

  const [soorahSelectBox] = getAllByRole('combobox')
  fireEvent.change(soorahSelectBox, {target:{value:2}})
  expect(soorahSelectBox).toHaveValue("2")
  
  const ayah = getByRole('spinbutton')
  fireEvent.change(ayah, {target:{value:23}})

  const query = getByPlaceholderText('Kəlmə')
  fireEvent.change(query, {target: {value: 'Musa'}})

  expect(soorahSelectBox).toHaveValue("0")
  expect(ayah).toHaveValue(null)
})
