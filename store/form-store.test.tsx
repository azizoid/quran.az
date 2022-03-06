import React from 'react'
import { render } from '@testing-library/react'

import { FormContextProvider } from './form-store'

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { soorah: 96, ayah: 1 },
  }),
}));

test("FormContextProvider snapshot", ()=>{
  const { container } = render(<FormContextProvider  />)

  expect(container).toMatchSnapshot()
})