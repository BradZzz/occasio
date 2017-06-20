// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux"
import * as UserActions from "../../../actions/user"
import styles from "./styles.css"

export default class FoldingCube extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={ "center" }>
        <div className={ styles.skfoldingcube } >
          <div className={ styles.skcube1 + " " + styles.skcube }></div>
          <div className={ styles.skcube2 + " " + styles.skcube }></div>
          <div className={ styles.skcube4 + " " + styles.skcube }></div>
          <div className={ styles.skcube3 + " " + styles.skcube }></div>
        </div>
      </div>
    )
  }
}