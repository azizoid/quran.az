import React from 'react'
import { render } from '@testing-library/react'

import { FormContextProvider } from './form-store'
import { useRouter } from 'next/router';

const push = jest.fn()
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

test("FormContextProvider snapshot", ()=>{
  (useRouter as jest.Mock).mockImplementation(() => ({
    push,
  }));

  const { container } = render(<FormContextProvider/>)

  expect(container).toMatchSnapshot()
})