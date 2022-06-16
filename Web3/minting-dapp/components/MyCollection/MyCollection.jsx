import { ethers } from 'ethers';

import styles from './MyCollection.module.scss';

import NftCard from '../NftCard/NftCard.jsx';

export default function MyCollection({tokens}) {
  return (
    <section className={styles.MyCollection}>
      {
        tokens.map(token => {
          const tokenId = ethers.BigNumber.from(token).toNumber();
          return <NftCard key={tokenId} id={tokenId}></NftCard>
        })
      }
      
    </section>
  )
}

