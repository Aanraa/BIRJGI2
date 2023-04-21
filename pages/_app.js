import "@/styles/globals.css";
import Head from "next/head";
import Layout from "@/components/Layout";
import { AuthUserProvider } from "@/firebase/auth";
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>BIRJGI</title>
      </Head>
      <AuthUserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthUserProvider>
    </>
  );
}
