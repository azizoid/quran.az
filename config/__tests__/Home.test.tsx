import { render } from '@testing-library/react'

import Home from '@/app/page'
import { AppRouterContextProviderMock } from '@/lib/app-router-context-provider-mock'

it('should render Home page', () => {
  const { container } = render(<AppRouterContextProviderMock router={{}}><Home/></AppRouterContextProviderMock>)

  expect(container).toMatchSnapshot()
})