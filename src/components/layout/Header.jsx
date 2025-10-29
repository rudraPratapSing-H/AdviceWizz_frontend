import React from 'react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.logo}>AI Therapist</h1>
        <nav className={styles.nav}>
          <button className={styles.navButton}>Settings</button>
          <button className={styles.navButton}>History</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
