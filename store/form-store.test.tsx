import React from 'react'
import { prettyDOM, render } from '@testing-library/react'

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

test("FormContextProvider snapshot", ()=>{
  (useRouter as jest.Mock).mockImplementation(() => ({
    query:{soorah:23, ayah:23, search:'Musa', t:1},
    push,
  }));

  const { container } = render(<FormContextProvider/>)

  expect(container).toMatchSnapshot()
})