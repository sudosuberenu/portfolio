import { useEffect, useCallback, useState } from 'react';
import { ethers } from 'ethers';

import { getContract } from '../../config/index.js';
import BerenuABI from '../../abis/Berenu.json';
import Button from '../Button/Button.jsx';
import styles from './Hero.module.scss';

export default function Hero({account, provider}) {
  const [price, setPrice] = useState();
  const [totalSupply, setTotalSupply] = useState();

  const getPrice = useCallback(async function() {
    const contract = await getContract("0x8e2Ba46B939bf3C5Ebb51B7C18f438AB3b0c5a38", BerenuABI.abi, provider, account);
    if (contract) {
      const result = await contract.price();
      setPrice(result/1e18);
    }
  }, [provider]);

  const getTotalSupply = useCallback(async function() {
    const contract = await getContract("0x8e2Ba46B939bf3C5Ebb51B7C18f438AB3b0c5a38", BerenuABI.abi, provider, account);
    if (contract) {
      const result = await contract.totalSupply();
      setTotalSupply(ethers.BigNumber.from(result).toNumber());
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
        <p> Number of NFT's Left: 3</p>
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
