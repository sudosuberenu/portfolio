import '../styles/globals.scss';

import { getLibrary } from '../config/index.js';
import { Web3ReactProvider } from '@web3-react/core';


function MyApp({ Component, pageProps}) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Component {...pageProps} />
    </Web3ReactProvider>
  )
};

export default MyApp;