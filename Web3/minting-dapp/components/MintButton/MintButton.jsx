import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';

import { getContract } from '../../utils/index.ts';

import styles from './MintButton.module.scss';

export default function MintButton({totalSupply, onTotalSupplyChange, tokensLeft, onTokensLeftChange}) {
  const {
    provider,
    account,
  } = useWeb3React();

  const mint = async () => {
    try {
      const contract = await getContract(provider, account);
      await contract.mint({from: account, value: ethers.utils.parseEther("0.1")});
      const newTotalSupply = totalSupply + 1;
      const newTokensLeft = tokensLeft - 1;
      onTotalSupplyChange(newTotalSupply);
      onTokensLeftChange(newTokensLeft);
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <button className={'button button--big' + ' ' + styles.MintButton} onClick={mint} disabled={tokensLeft === 0} >Mint</button>
  )
}
