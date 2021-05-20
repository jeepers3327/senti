import ProgressBar from '@badrap/bar-of-progress';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { SocketProvider } from '@/contexts';
import { store } from '@/store';
import '@/styles/global.css';

const APP_WS_URL =
  process.env.NEXT_PUBLIC_APP_WS_URL || `ws://localhost:4000/socket`;

const progress = new ProgressBar({
  size: 2,
  color: `#3182ce`,
  className: `bar-of-progress`,
  delay: 100,
});

const App = ({ Component, pageProps }: AppProps) => {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    Router.events.on(`routeChangeStart`, progress.start);
    Router.events.on(`routeChangeComplete`, progress.finish);
    Router.events.on(`routeChangeError`, progress.finish);
    return () => {
      Router.events.off(`routeChangeStart`, progress.start);
      Router.events.off(`routeChangeComplete`, progress.finish);
      Router.events.off(`routeChangeError`, progress.finish);
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <ChakraProvider>
      <SocketProvider wsUrl={APP_WS_URL}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </SocketProvider>
    </ChakraProvider>
  );
};

export default App;
