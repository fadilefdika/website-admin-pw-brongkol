// pages/_app.tsx
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@/components/layout/Layout';
import { TreeDataProvider } from '@/context/TreeDataContext';

function App({ Component, pageProps }: AppProps) {
  return (
    <TreeDataProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </TreeDataProvider>
  );
}

export default App;
