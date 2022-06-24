import { useEffect, useState, useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import Image from 'next/image';
import axios from 'axios';

import { getContract } from '../../config/index.ts';

import styles from './NftCard.module.scss';

export default function NftCard({id}) {
  const { provider } = useWeb3React();
  const [ name, setName ] = useState();

  const getNFTMetadata = useCallback(async function() {
    const contract = await getContract(provider);
    const tokenURI = await contract.tokenURI(id) || `./assets/nfts/${id}.json`;
    const response = await axios.get(tokenURI);

    setName(response?.data?.name);
  });

  const myLoader = ({ src }) => {
    return `/assets/nfts/${src}`;
  }

  useEffect(() => {
    if (provider) {
      getNFTMetadata();
    }
  }, [provider]);

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
        {name}
      </div>
    </div>
  );
}