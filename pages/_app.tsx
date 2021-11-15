import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserContextProvider } from "@/utils/useUser";
import { MainLayout } from "@/components/Layout/MainLayout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </UserContextProvider>
  );
}

export default MyApp;
