import styles from './Account.module.scss';

export default function Account({account}) {
  return (
    <span className={styles.Account}>Hello: {account}</span>
  );
}