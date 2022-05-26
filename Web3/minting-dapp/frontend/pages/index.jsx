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
  } = useWeb3React();

  const connect = useCallback(() => {
    console.log('CONNECT')
    activate(connector);
    localStorage.setItem('connected', true);
  }, [activate]);


  useEffect(()=> {
    if (localStorage.getItem('connected') === 'true') {
      connect();
    }
  }, [connect]);

  return (
    <>
      <Title></Title>
      <div className={styles.HomePage}>
        <Hero></Hero>
      </div>
      <Footer></Footer>
    </>
  )
}
