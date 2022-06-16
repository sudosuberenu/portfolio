import { useWeb3React } from '@web3-react/core';

import Hero from '../Hero/Hero.jsx';

import styles from './Body.module.scss'

export default function Body() {
  const {
    library,
    account
  } = useWeb3React();

  return (
    <div className={styles.Body}>
      <Hero account={account} provider={library}></Hero>
    </div>
  );
  
}