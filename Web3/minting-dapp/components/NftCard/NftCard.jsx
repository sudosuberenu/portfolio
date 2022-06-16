import { useEffect, useState, useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import Image from 'next/image';
import axios from 'axios';

import styles from './NftCard.module.scss';
import { getContract } from '../../config/index.js';

export default function NftCard({id}) {
  const { library, account } = useWeb3React();
  const [ description, setDescription ] = useState();

  const getNFTMetadata = useCallback(async function() {
    const contract = await getContract(library, account);
    const tokenURI = await contract.tokenURI(id) || `./assets/nfts/${id}.json`;
    const response = await axios.get(tokenURI);

    setDescription(response?.data?.description);

  });

  const myLoader = ({ src }) => {
    return `/assets/nfts/${src}`;
  }

  useEffect(() => {
    if (library) {
      getNFTMetadata();
    }
  }, [library]);

  return (
    <div className={styles.NftCard} key={id}>
      <Image
        loader={myLoader}
        src={`${id}.png`}
        alt="Picture of the author"
        width={230}
        height={230}
      />
      <div className={styles.NftCard__container}>
        {description}
      </div>
    </div>
  );
}