import { useEffect, useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';

import { connector } from '../config/index.js';

import styles from './HomePage.module.scss'

import Title from '../components/Title/Title.jsx';
import Hero from '../components/Hero/Hero.jsx';
import Footer from '../components/Footer/Footer.jsx';

export default function HomePage() {
  const {
    activate, 
    active,
    library,
    account
  } = useWeb3React();

  const connect = useCallback(() => {
    activate(connector);
  }, [activate]);


  useEffect(()=> {
      connect();
  }, [connect, active]);

  return (
    <>
      <Title></Title>
      <div className={styles.HomePage}>
        <Hero account={account} provider={library}></Hero>
      </div>
      <Footer></Footer>
    </>
  )
}
