import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import "@/styles/header.css";
import "@/styles/sidebar.css";
import "@/styles/dashboard.css";
import "@/styles/category.css";
import "@/styles/attributes.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";
import {useRouter} from 'next/router';
import Loader from "@/components/Loader";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    router.isReady && setIsLoading(false)
  }, []);

  return (
    <SessionProvider session={pageProps.session}>
      {
        (isLoading)
          ?
          <Loader/>
          :
          <Layout>
            <Component {...pageProps} />
          </Layout>
      }
    </SessionProvider>
  );
}
