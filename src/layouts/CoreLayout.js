// @flow
import React from "react";
import { Link } from "react-router";
import styles from "./CoreLayout.css";
import { HeaderPanel, TitlePanel, NavPanel } from "../components/organisms/"


type Props = {
  children: React$Element<any>;
};

const CoreLayout = (props: Props) => {
  const { children } = props;

  return (
    <div className={styles.root}>
      <div className={styles.left}>
        <NavPanel></NavPanel>
      </div>
      <div className={styles.right}>
        <HeaderPanel></HeaderPanel>
        <TitlePanel></TitlePanel>
        <div className={styles.frame}>
          {children}
        </div>
      </div>
    </div>
  )
};

export default CoreLayout;
