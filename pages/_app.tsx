import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Hydrate } from 'react-query/hydration';
import { useState } from 'react';

import { UserContextProvider } from "@/utils/useUser";

import { NotificationList } from "@/components/ui/Notification";
import { MainLayout } from "@/components/ui/Layout/MainLayout";

function MyApp({ Component, pageProps }: AppProps) {
    const [queryClient] = useState(
      () =>
        new QueryClient({
          defaultOptions: {
            queries: {
              staleTime: 20 * 1000
            }
          }
        })
    );
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <NotificationList />
        <UserContextProvider>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </UserContextProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
