import {
  render as rtlRender,
  screen,
  waitForElementToBeRemoved
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Hydrate } from 'react-query/hydration';
import { useState } from 'react';

// import { MainLayout } from '@/components/ui/Layout/MainLayout';

const Providers = ({children}) => {
  return children
};

const customRender = (ui, options = {}) =>
  render(ui, { wrapper: Providers, ...options });

// eslint-disable-next-line import/export
export * from '@testing-library/react';
export { userEvent, rtlRender };
