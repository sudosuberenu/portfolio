import { useWeb3React } from '@web3-react/core';

import Hero from '../Hero/Hero.jsx';

import styles from './Body.module.scss'

export default function Body() {
  const {
    isActive
  } = useWeb3React();

  return (
    <main className={styles.Body}>
     {
      // isActive ?
        <Hero></Hero>
      //  :
        // <div>Not connected</div> 
     }
    </main>
  );
  
}