import '../styles/globals.scss';

import { getLibrary } from '../config/index.js';
import { Web3ReactProvider } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';

import { initializeConnector } from '@web3-react/core';

const [metaMask, hooks] = initializeConnector((actions) => new MetaMask({ actions }))

function MyApp({ Component, pageProps}) {
  return (
    <Web3ReactProvider connectors={[[metaMask, hooks]]}>
      <Component {...pageProps} />
    </Web3ReactProvider>
  )
};

export default MyApp;