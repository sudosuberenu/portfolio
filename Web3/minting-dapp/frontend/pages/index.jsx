import { useEffect, useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';

import { connector, getContract } from '../config/index.js';
import BerenuABI from '../abis/Berenu.json';

import styles from './HomePage.module.scss'

import Title from '../components/Title/Title.jsx';
import Button from '../components/Button/Button.jsx';
import Footer from '../components/Footer/Footer.jsx';

export default function HomePage() {
  const {
    library,
    activate, 
    active, 
    deactivate,
    error, 
    account,
    chainId,
  } = useWeb3React();

  const connect = useCallback(() => {
    activate(connector);
    localStorage.setItem('connected', true);
  }, [activate]);

  const disconnect = () => {
    deactivate();
    localStorage.removeItem('connected');
  };

  const mint = async () => {
    console.log('LIBRARY', library)
    const contract = getContract("0x8e2Ba46B939bf3C5Ebb51B7C18f438AB3b0c5a38", BerenuABI.abi, library);

    console.log('CONTRACT', contract)
    // const contract = new Contract(BerenuABI.abi,"0x8e2Ba46B939bf3C5Ebb51B7C18f438AB3b0c5a38", library);
    // console.log(active)
    // console.log(contract.methods.mint().send())
    // const result = await contract.methods.mint().send({ from: account });
    // console.log('RSULT', result);
  };

  useEffect(()=> {
    if (localStorage.getItem('connected') === 'true') {
      connect();
    }
  }, [connect]);

  if (error) {
    return <p>Error: {error.message}</p>
  }

  return (
    <>
      <Title></Title>
      <div className={styles.HomePage}>
        <Button />
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
      </div>
      <Footer></Footer>
    </>
  )
}
