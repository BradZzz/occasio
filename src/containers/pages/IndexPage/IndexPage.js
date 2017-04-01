// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"

import * as UserActions from "../../../actions/user"

import styles from "./styles.css"
import { Button } from "../../../components/atoms/"
import { CenterBox } from "../../../components/molecules/"
import { LoginPanel } from "../../../components/organisms/"
import TextField from 'material-ui/TextField';
import type { Dispatch } from "redux"

export default class IndexPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={styles.root}>
          <LoginPanel></LoginPanel>
      </div>
    )
  }

}