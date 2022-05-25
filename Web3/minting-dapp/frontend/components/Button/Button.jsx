import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { getContract } from '../../config/index.js';


import BerenuABI from '../../abis/Berenu.json';
import styles from './Button.module.scss';

export default function Button() {

  const {
    library,
    activate, 
    active, 
    deactivate,
    error, 
    account,
    chainId,
  } = useWeb3React();

  const mint = async () => {
    try {
      const contract = await getContract("0x8e2Ba46B939bf3C5Ebb51B7C18f438AB3b0c5a38", BerenuABI.abi, library);
      const result = await contract.price({from: account});

      console.log('result', result/1e18)

    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <button className={styles.Button} onClick={mint}>Mint</button>
  )
}
