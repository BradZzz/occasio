// @flow
import React, { Component } from "react";
import styles from "./styles.css";
import FlatButton from 'material-ui/FlatButton';

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
      <FlatButton
        {...this.props}
        className={styles.root}>
        {this.props.children}
      </FlatButton>
    );
  }
}
