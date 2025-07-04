import '../src/styles/globals.css';
import { Inter } from 'next/font/google';
import type { AppProps } from 'next/app';

const inter = Inter({ subsets: ['latin'] });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
