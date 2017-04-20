// @flow
import React, { Component, PropTypes } from "react"
import { Login, FoldingCube } from "../../../components/atoms/"
import { LogoutButton } from "../../../components/molecules/"
import { connect } from "react-redux"
import * as UserActions from "../../../actions/user"
import styles from "./styles.css"

export default class LoginPanel extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={styles.root}>
        <FoldingCube style={{ 'margin-top' : '5em' }}></FoldingCube>
        <Login></Login>
      </div>
    )
  }
}