import { useEffect, useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';

import Button from '../Button/Button.jsx';

import styles from './Hero.module.scss';

export default function Hero() {
  const {
    library,
    account,
  } = useWeb3React();

  useEffect(()=> {
    
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.hero__header}>
        <ul className={styles.nav} role="tablist">
          <li className={styles.nav__item + ' ' + styles['nav__item--first']}>Mint</li>
          <li className={styles.nav__item + ' ' + styles['nav__item--last'] + ' ' + styles['nav__item--deactive']}>Your NFT's</li>
        </ul>
      </div>
      <div className={styles.hero__body}>
        <p>NFT Price: 0.1 Ether</p>
        <p> Total Supply: 5</p>
        <p> Number of NFT's Left: 3</p>
        <Button />
      </div>
      {/* {
          active 
            ? 
              <>
                <button onClick={disconnect}>Disconnect Wallet</button>
                <p>You are connected to {chainId}</p>
                <p>Your account is: {account} </p>
              </>
            :  <button onClick={connect}>Connect Wallet</button>
        } */}
    </section>
  )
}
