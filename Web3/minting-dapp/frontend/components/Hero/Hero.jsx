import Button from '../Button/Button.jsx';

import styles from './Hero.module.scss';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.hero__header}>
        <ul className={styles.nav} role="tablist">
          <li className={styles.nav__item + ' ' + styles['nav__item--active']}>Mint</li>
          <li className={styles.nav__item}>Your NFT's</li>
        </ul>
      </div>
      <div className={styles.hero__body}>
        <Button />
      </div>
      {/* {
          active 
            ? 
              <>
                <button onClick={disconnect}>Disconnect Wallet</button>
                <p>You are connected to {chainId}</p>
                <p>Your account is: {account} </p>
              </>
            :  <button onClick={connect}>Connect Wallet</button>
        } */}
    </section>
  )
}
