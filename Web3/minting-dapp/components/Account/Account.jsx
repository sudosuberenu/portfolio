import { useWeb3React } from '@web3-react/core';
import { useEffect } from 'react';
import { useState } from 'react';

import styles from './Account.module.scss';

export default function Account() {
  const [userAccount, setUserAccount] = useState();

  const {
    account,
  } = useWeb3React();

  useEffect(() => {
    const newUserAccount = `${account.slice(0,6)}...${account.slice(38,42)}`;
    setUserAccount(newUserAccount);
  }, [account]);

  return (
    <div className={styles.Account}>
      <span> {userAccount}</span>
    </div>
  );
}