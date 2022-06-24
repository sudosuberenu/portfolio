import { useEffect, useCallback, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';

import { getContract } from '../../config/index.ts';

import MintButton from '../MintButton/MintButton.jsx';
import ConnectButton from '../ConnectButton/ConnectButton.jsx';
import MyCollection from '../MyCollection/MyCollection.jsx';

import styles from './Hero.module.scss';

export default function Hero() {
  const [price, setPrice] = useState();
  const [maxTotalSupply, setMaxTotalSupply] = useState();
  const [totalSupply, setTotalSupply] = useState();
  const [tokensLeft, setTokensLeft] = useState();
  const [firtsActive, setFirtsActive] = useState(true);
  const [userTokens, setUserTokens] = useState();

  const {
    isActive,
    connector,
    provider,
    account,
  } = useWeb3React();

  const classNameFirtItem = firtsActive
        ? styles.nav__item + ' ' + styles['nav__item--first']
        : styles.nav__item + ' ' + styles['nav__item--first'] + ' ' + styles['nav__item--deactive'];

  const classNameSecondItem = !firtsActive
        ? styles.nav__item + ' ' + styles['nav__item--last']
        : styles.nav__item + ' ' + styles['nav__item--last'] + ' ' + styles['nav__item--deactive']; 
        
  const classNameDisabledItem = styles.nav__item + ' ' + styles['nav__item--last'] + ' ' + styles['nav__item--disabled'] + ' ' + styles['nav__item--deactive']; 

  const getPrice = useCallback(async function() {
    if (isActive) {
      const contract = await getContract(provider);
      if (contract) {
        const result = await contract.price();
        setPrice(result/1e18);
      }
    }
  }, [isActive]);

  const getTotalSupply = useCallback(async function() {
    if (isActive) {
      const contract = await getContract(provider);
      if (contract) {
        const currentTotalSuppply = await contract.totalSupply();
        const currentMaxSupply = await contract.maxSupply();
        setTotalSupply(ethers.BigNumber.from(currentTotalSuppply).toNumber());
        setMaxTotalSupply(ethers.BigNumber.from(currentMaxSupply).toNumber());
        setTokensLeft(ethers.BigNumber.from(currentMaxSupply).toNumber() - ethers.BigNumber.from(currentTotalSuppply).toNumber());
      }
    }
  }, [isActive]);

  const getUserTokens = useCallback(async function() {
    if (isActive) {
      const contract = await getContract(provider);
      if (contract) {
        const currentUserTokens = await contract.walletOfOwner(account);
        setUserTokens(currentUserTokens);
      }
    }
  }, [isActive]);

  useEffect(function () {
    if (!isActive) {
      setFirtsActive(true);
    }
  }, [isActive])

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
  }, [connector, isActive]);

  return (
    <section className={styles.hero}>
      <div className={styles.hero__header}>
        <ul className={styles.nav} role="tablist">
          <li className={classNameFirtItem} onClick={ () => {toggle(true)}}>Mint</li>
          {
            isActive ?
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
              isActive ?
              <>
                <p>{totalSupply} / {maxTotalSupply}</p>
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
