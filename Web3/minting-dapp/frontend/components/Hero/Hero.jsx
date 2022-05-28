import { useEffect, useCallback, useState } from 'react';
import { ethers } from 'ethers';

import { getContract } from '../../config/index.js';
import Button from '../Button/Button.jsx';
import styles from './Hero.module.scss';

export default function Hero({account, provider}) {
  const [price, setPrice] = useState();
  const [totalSupply, setTotalSupply] = useState();
  const [tokensLeft, setTokensLeft] = useState();

  const getPrice = useCallback(async function() {
    const contract = await getContract(provider, account);
    if (contract) {
      const result = await contract.price();
      setPrice(result/1e18);
    }
  }, [provider]);

  const getTotalSupply = useCallback(async function() {
    const contract = await getContract(provider, account);
    if (contract) {
      const currentTotalSuppply = await contract.totalSupply();
      const currentMaxSupply = await contract.maxSupply();
      setTotalSupply(ethers.BigNumber.from(currentTotalSuppply).toNumber());
      setTokensLeft(ethers.BigNumber.from(currentMaxSupply).toNumber() - ethers.BigNumber.from(currentTotalSuppply).toNumber());
    }
  }, [provider]);

  function onTotalSupplyChange(newValue) {   
    setTotalSupply(newValue);
  }

  useEffect(() => {
    getPrice();
    getTotalSupply();
  }, [provider]);

  return (
    <section className={styles.hero}>
      <div className={styles.hero__header}>
        <ul className={styles.nav} role="tablist">
          <li className={styles.nav__item + ' ' + styles['nav__item--first']}>Mint</li>
          <li className={styles.nav__item + ' ' + styles['nav__item--last'] + ' ' + styles['nav__item--deactive']}>Your NFT's</li>
        </ul>
      </div>
      <div className={styles.hero__body}>
        <p>NFT Price: {price} Ether</p>
        <p> Total Supply: {totalSupply}</p>
        <p> Number of NFT's Left: {tokensLeft}</p>
        <Button totalSupply={totalSupply} onTotalSupplyChange={onTotalSupplyChange}/>
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
