// import React from 'react';
import styles from './Footer.module.css';

interface FooterProps {
  totalRows: React.ReactNode;
  children: React.ReactNode;
}

const Footer = ({ totalRows, children }: FooterProps) => {
  return (
    <div className={styles.footer}>
      <div>{totalRows}</div>
      <div className={styles.rowsPage}>{children}</div>
    </div>
  );
};

export default Footer;
