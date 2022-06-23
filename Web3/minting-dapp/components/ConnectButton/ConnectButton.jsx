import { useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';

export default function ConnectButton() {
  const {
    connector
  } = useWeb3React();

  const connect = useCallback(async () => {
    connector.activate();
  });

  return (
    <button className='button button--medium connect__button' onClick={connect}>Connect Wallet</button>
  );
}