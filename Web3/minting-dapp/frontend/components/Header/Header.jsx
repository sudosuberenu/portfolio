import { useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';

import { connector } from '../../config/index.js';

import Account from '../Account/Account.jsx';

import styles from './Header.module.scss';

export default function Header() {
  const {
    deactivate,
    active,
    account,
  } = useWeb3React();


  const disconnect = useCallback(() => {
    deactivate(connector);
  }, [deactivate]);

  return (
    <section className={styles.Header}>
      <h1>Minting Dapp</h1>
      {
        active &&
        <>
          <Account account={account}></Account>
          <button className='button button--medium disconnect__button' onClick={disconnect}>Disconnect</button>
        </>
      }
    </section>
  )
}
