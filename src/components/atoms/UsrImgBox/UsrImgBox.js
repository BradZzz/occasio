// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux"
import { UserImg } from "../../quarks/"
import * as UserActions from "../../../actions/user"
import styles from "./styles.css"

export default class UsrImgBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      style: props.style || 0,
      pstyles: [{
        display: 'inline-flex',
        border: '1px solid #000',
      }]
    }
  }

  render() {
    const { pstyles, style } = this.state
    return (
      <div className={styles.root} style={ pstyles[style] }>
        <UserImg></UserImg>
      </div>
    )
  }
}