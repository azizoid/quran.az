import Home from '@/app/page'
import { AppRouterContextProviderMock } from '@/lib/app-router-context-provider-mock'
import { render,screen } from '@testing-library/react'

it('should render Home page', () => {
  const { container } = render(<AppRouterContextProviderMock router={{}}><Home/></AppRouterContextProviderMock>)

  expect(container).toMatchSnapshot()
})