// @flow
import React, { Component } from "react";
import styles from "./Button.css";


type Props = {
  children: React$Element<any>;
};

type State = {
};

export default class Button extends Component {
  props: Props;
  state: State;

  render() {
    return (
      <button
        {...this.props}
        className={styles.root}
      >
        {this.props.children}
      </button>
    );
  }
}
