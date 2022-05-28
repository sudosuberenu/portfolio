import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';

import { getContract } from '../../config/index.js';
import BerenuABI from '../../abis/Berenu.json';
import styles from './Button.module.scss';

export default function Button({totalSupply, onTotalSupplyChange}) {
  const {
    library,
    account,
  } = useWeb3React();

  const mint = async () => {
    try {
      const contract = await getContract("0x8e2Ba46B939bf3C5Ebb51B7C18f438AB3b0c5a38", BerenuABI.abi, library, account);
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
