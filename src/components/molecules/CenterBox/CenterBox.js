// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux"
import { Button } from "../../atoms/"
import * as UserActions from "../../../actions/user"
import styles from "./styles.css"

export default class CenterBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      height: props.height,
      align: props.align
    }
  }

  inner = () => {
    if ( this.state.align === "right" ){
      return (
        <div className={styles.inner} style={{ "margin-left" : "auto" }}>
          { this.props.children }
        </div>
      )
    } else if ( this.state.align === "left" ) {
      return (
        <div className={styles.inner} style={{ "margin-right" : "auto" }}>
          { this.props.children }
        </div>
      )
    } else {
      return (
        <div className={styles.inner} style={{ "margin-left" : "auto", "margin-left" : "auto" }}>
          { this.props.children }
        </div>
      )
    }
  }

  render() {
    return (
      <div className={styles.outer} style={{ height : this.state.height }}>
        <div className={styles.middle}>
          { this.inner() }
        </div>
      </div>
    )
  }
}