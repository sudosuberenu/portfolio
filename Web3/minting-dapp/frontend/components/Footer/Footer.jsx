import React from 'react';
import styles from './Footer.module.scss';

class Footer extends React.Component {
  render() {
    return (
      <footer className={styles.Footer}>
        <p>Belén Iniesta - 2022</p>
        <p>Social Icons</p>
      </footer>
    )
  }
}

export default Footer;