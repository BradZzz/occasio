// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import Helmet from "../../../components/utils/Helmet";
import * as CounterActions from "../../../actions/counter";
import * as UserActions from "../../../actions/user";
import styles from "./IndexPage.css";
import { Button } from "../../../components/atoms/";

import type { Dispatch } from "redux";


type Props = {
  dispatch: Dispatch<*>;
  counter: { count: number; };
};

export class IndexPage extends Component {
  props: Props;

  increment = () => {
    this.props.dispatch(CounterActions.increment())
  }

  decrement = () => {
    this.props.dispatch(CounterActions.decrement())
  }

  incrementAsync = () => {
    this.props.dispatch(CounterActions.incrementAsync())
  }

  render() {
    return (
      <div className={styles.root}>
        <Helmet title="Index" />

        <Button onClick={this.increment}>+1</Button>
        {" "}
        <Button onClick={this.decrement}>-1</Button>
        {" "}
        <Button onClick={this.incrementAsync}>+1 (async)</Button>

        <p>Result: {this.props.counter.count}</p>
      </div>
    )
  }
}

export default connect(
  state => ({
    counter: state.counter
  })
)(IndexPage)
