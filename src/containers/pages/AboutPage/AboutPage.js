// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import Helmet from "../../../components/utils/Helmet";
import styles from "./AboutPage.css";

type Props = {
};

export class AboutPage extends Component {
  props: Props;

  render() {
    return (
      <div className={styles.root}>
        <Helmet title="About" />

        AboutPage
      </div>
    );
  }
}

export default connect(
  state => state
)(AboutPage);
