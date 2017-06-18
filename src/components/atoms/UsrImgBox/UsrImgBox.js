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
      style: props.style
    }
  }

  render() {
    return (
      <div className={styles.root} style={ this.state.style }>
        <UserImg></UserImg>
      </div>
    )
  }
}