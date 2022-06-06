import { useEffect, useCallback, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';

import { getContract } from '../../config/index.js';

import MintButton from '../MintButton/MintButton.jsx';
import ConnectButton from '../ConnectButton/ConnectButton.jsx';
import MyCollection from '../MyCollection/MyCollection.jsx';

import styles from './Hero.module.scss';

export default function Hero({account, provider}) {
  const [price, setPrice] = useState();
  const [maxTotalSupply, setMaxTotalSupply] = useState();
  const [totalSupply, setTotalSupply] = useState();
  const [tokensLeft, setTokensLeft] = useState();
  const [firtsActive, setFirtsActive] = useState(true);
  const [userTokens, setUserTokens] = useState();

  const {
    active,
  } = useWeb3React();

  const classNameFirtItem = firtsActive
        ? styles.nav__item + ' ' + styles['nav__item--first']
        : styles.nav__item + ' ' + styles['nav__item--first'] + ' ' + styles['nav__item--deactive'];

  const classNameSecondItem = !firtsActive
        ? styles.nav__item + ' ' + styles['nav__item--last']
        : styles.nav__item + ' ' + styles['nav__item--last'] + ' ' + styles['nav__item--deactive']; 
        
  const classNameDisabledItem = styles.nav__item + ' ' + styles['nav__item--last'] + ' ' + styles['nav__item--disabled'] + ' ' + styles['nav__item--deactive']; 

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
      setMaxTotalSupply(ethers.BigNumber.from(currentMaxSupply).toNumber());
      setTokensLeft(ethers.BigNumber.from(currentMaxSupply).toNumber() - ethers.BigNumber.from(currentTotalSuppply).toNumber());
    }
  }, [provider]);

  const getUserTokens = useCallback(async function() {
    const contract = await getContract(provider, account);
    if (contract) {
      const currentUserTokens = await contract.walletOfOwner(account);
      setUserTokens(currentUserTokens);
    }
  }, [provider]);

  function onTotalSupplyChange(value) {   
    setTotalSupply(value);
  }

  function onTokensLeftChange(value) {   
    setTokensLeft(value);
  }

  const toggle = (value) => {
    setFirtsActive(value);
    if (!value) {
      getUserTokens();
    }
  }

  useEffect(() => {
    getPrice();
    getTotalSupply();
    getUserTokens();
  }, [provider]);

  return (
    <section className={styles.hero}>
      <div className={styles.hero__header}>
        <ul className={styles.nav} role="tablist">
          <li className={classNameFirtItem} onClick={ () => {toggle(true)}}>Mint</li>
          {
            active ?
              <li className={classNameSecondItem} onClick={ () => {toggle(false)}}>My collection</li>
              :
              <li className={classNameDisabledItem}>My collection</li>
          }
        </ul>
      </div>
      <div className={styles.hero__body}>
      {
        firtsActive ?
          <section>
            {
              active ?
              <>
                <p>{totalSupply} / {maxTotalSupply}</p>
                {/* <p>Number of NFT's Left: {tokensLeft}</p> */}
                <p>One BRN costs {price} Ether</p>
                <p>Excluding gas fees</p>
                <MintButton totalSupply={totalSupply} tokensLeft={tokensLeft} onTotalSupplyChange={onTotalSupplyChange} onTokensLeftChange={onTokensLeftChange}/>
              </>
              :
              <ConnectButton></ConnectButton>
            }
            
          </section>
        :
        <></>
      }
      {
        !firtsActive ?
          <MyCollection tokens={userTokens}></MyCollection>
          :
          <></>
      }
      </div>
    </section>
  )
}
