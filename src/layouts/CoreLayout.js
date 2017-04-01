// @flow
import React from "react";
import { Link } from "react-router";
import styles from "./CoreLayout.css";
import { HeaderPanel } from "../components/organisms/"


type Props = {
  children: React$Element<any>;
};

const CoreLayout = (props: Props) => {
  const { children } = props;

  return (
    <div className={styles.root}>
      <HeaderPanel></HeaderPanel>
      <header className={styles.header}>
        <h1 className={styles.title}>occas.io</h1>
      </header>

      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
};


export default CoreLayout;
