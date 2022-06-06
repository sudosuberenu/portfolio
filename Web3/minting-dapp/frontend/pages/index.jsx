import { useEffect, useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';

import { connector } from '../config/index.js';

import Title from '../components/Title/Title.jsx';
import Body from '../components/Body/Body.jsx';
import Footer from '../components/Footer/Footer.jsx';

export default function HomePage() {
  const {
    activate, 
    active,
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
      <Body></Body>
      <Footer></Footer>
    </>
  )
}
