import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';

import { getContract } from '../../config/index.js';

import styles from './Button.module.scss';

export default function Button({totalSupply, onTotalSupplyChange}) {
  const {
    library,
    account,
  } = useWeb3React();

  const mint = async () => {
    try {
      const contract = await getContract(library, account);
      await contract.mint({from: account, value: ethers.utils.parseEther("0.1")});
      const newTotalSupply = totalSupply + 1;
      onTotalSupplyChange(newTotalSupply);
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <button className={styles.Button} onClick={mint}>Mint</button>
  )
}
