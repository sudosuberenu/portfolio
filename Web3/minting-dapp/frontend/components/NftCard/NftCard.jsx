import { useEffect, useState, useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import axios from 'axios';

import styles from './NftCard.module.scss';

import { getContract } from '../../config/index.js';

export default function NftCard({id}) {
  const { library, account } = useWeb3React();

  const [image, setImage] = useState(null);

  const getTokenUri = useCallback(async function() {
    const contract = await getContract(library, account);
    const tokenURI = await contract.tokenURI(id);
    console.log('tokenURI', tokenURI);

    const response = await axios.get(tokenURI);
    console.log('response', response);
  });

  useEffect(() => {
    if (library) {
      getTokenUri();
    }
  }, [library]);

  return (
    <div className={styles.NftCard} key={id}>
      {/* <img src={image} alt="Avatar" style="width:100%" /> */}
      <div className={styles.NftCard__container}>
        <h3>Hello</h3>
        <p>I am ...</p>
      </div>
    </div>
  );
}