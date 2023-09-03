import React, { ReactNode } from 'react'

import {
  AppRouterContext,
  AppRouterInstance,
} from 'next/dist/shared/lib/app-router-context'

export type AppRouterContextProviderMockProps = {
  router: Partial<AppRouterInstance>;
  children: ReactNode;
};

export const AppRouterContextProviderMock = ({
  router,
  children,
}: AppRouterContextProviderMockProps): ReactNode => {
  const mockedRouter: AppRouterInstance = {
    back: jest.fn(),
    forward: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
    ...router,
  }
  return (
    <AppRouterContext.Provider value={mockedRouter}>
      {children}
    </AppRouterContext.Provider>
  )
}