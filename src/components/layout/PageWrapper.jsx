import React from 'react';
import styles from './PageWrapper.module.css';

const PageWrapper = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default PageWrapper;
