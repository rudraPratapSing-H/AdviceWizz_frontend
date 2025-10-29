import React from 'react';
import styles from './Button.module.css';

const Button = ({ children, onClick, variant = 'primary', disabled = false, type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${styles[variant]}`}
    >
      {children}
    </button>
  );
};

export default Button;
