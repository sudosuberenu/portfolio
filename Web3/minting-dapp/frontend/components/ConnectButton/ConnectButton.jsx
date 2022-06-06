import { useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';

import { connector } from '../../config/index.js';

export default function ConnectButton() {
  const {
    activate
  } = useWeb3React();
  

  const connect = useCallback(() => {
    activate(connector);
  }, [activate]);

  return (
    <button className='button button--medium connect__button' onClick={connect}>Connect</button>
  );
}