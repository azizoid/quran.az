import { render, fireEvent } from '@testing-library/react'
import { Form } from './Form'
import { FormContextProvider } from '../../store/form-store'
import { useRouter } from 'next/router'

const defaultTranslator = process.env.NEXT_PUBLIC_DEFAULT_TRANSLATOR

const push = jest.fn()
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

jest.mock('@/ui/LoadingBoxes/LoadingBoxes', () => <span>Loader</span>)

beforeEach(() => {
  ;(useRouter as jest.Mock).mockImplementation(() => ({
    push,
    query: {},
  }))
})

test('Form Snapshot', () => {
  const { container, getByRole, getAllByRole } = render(<Form />)

  expect(getAllByRole('combobox')).toHaveLength(2)
  expect(getByRole('spinbutton')).toBeInTheDocument()
  expect(getByRole('textbox')).toBeInTheDocument()
  expect(getByRole('button', { name: 'Axtar' })).toBeInTheDocument()

  expect(container).toMatchSnapshot()
})

test('Click submit button on empty form', () => {
  const { getByRole } = render(
    <FormContextProvider>
      <Form />
    </FormContextProvider>
  )

  const submitBtn = getByRole('button')
  fireEvent.click(submitBtn)

  expect(push).toHaveBeenLastCalledWith(`/`)
})

test('Change Soorah to 2 and click Submit Button', () => {
  const { getByRole, getAllByRole } = render(
    <FormContextProvider>
      <Form />
    </FormContextProvider>
  )

  const submitBtn = getByRole('button')
  const [soorahSelectBox] = getAllByRole('combobox')

  fireEvent.change(soorahSelectBox, { target: { value: 2 } })
  expect(soorahSelectBox).toHaveValue('2')

  fireEvent.click(submitBtn)

  expect(push).toHaveBeenLastCalledWith(`/2?t=${defaultTranslator}`)
})

test('Select Soorah 2 and Ayah 23 and click the button', () => {
  const { getByRole, getAllByRole } = render(
    <FormContextProvider>
      <Form />
    </FormContextProvider>
  )

  const submitBtn = getByRole('button')
  const [soorahSelectBox] = getAllByRole('combobox')
  const ayah = getByRole('spinbutton')

  fireEvent.change(soorahSelectBox, { target: { value: 2 } })
  fireEvent.change(ayah, { target: { value: 23 } })

  fireEvent.click(submitBtn)
  expect(push).toHaveBeenLastCalledWith(`/2/23?t=${defaultTranslator}`)
})

test('Enter Search Query and click the button', () => {
  const { getByRole, getByPlaceholderText } = render(
    <FormContextProvider>
      <Form />
    </FormContextProvider>
  )

  const submitBtn = getByRole('button')
  const query = getByPlaceholderText('Kəlmə')

  fireEvent.change(query, { target: { value: 'Musa' } })

  fireEvent.click(submitBtn)
  expect(push).toHaveBeenLastCalledWith(`/search/Musa?t=${defaultTranslator}`)
})

test('Reset Soorah and Ayah on Query enter', () => {
  const { getByRole, getByPlaceholderText, getAllByRole } = render(
    <FormContextProvider>
      <Form />
    </FormContextProvider>
  )

  const [soorahSelectBox, translatorSelectBox] = getAllByRole('combobox')
  const ayah = getByRole('spinbutton')
  const query = getByPlaceholderText('Kəlmə')

  fireEvent.change(soorahSelectBox, { target: { value: 2 } })
  fireEvent.change(ayah, { target: { value: 23 } })

  expect(soorahSelectBox).toHaveValue('2')
  expect(ayah).toHaveValue(23)
  expect(translatorSelectBox).toHaveValue('4')
  expect(query).toHaveValue('')

  fireEvent.change(query, { target: { value: 'Musa' } })
  fireEvent.change(translatorSelectBox, { target: { value: 1 } })

  expect(soorahSelectBox).toHaveValue('0')
  expect(ayah).toHaveValue(null)
  expect(translatorSelectBox).toHaveValue('1')
  expect(query).toHaveValue('Musa')
})
