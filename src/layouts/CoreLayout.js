// @flow
import React from "react";
import { Link } from "react-router";
import styles from "./CoreLayout.css";


type Props = {
  children: React$Element<any>;
};

const CoreLayout = (props: Props) => {
  const { children } = props;

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <h1 className={styles.title}>Frontend boilerplate</h1>
        <ul className={styles.nav}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about/">About</Link></li>
          <li><Link to="/login/">Login</Link></li>
        </ul>
      </header>

      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};


export default CoreLayout;
