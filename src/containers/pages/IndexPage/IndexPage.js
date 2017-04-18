// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"

import * as UserActions from "../../../actions/user"

import styles from "./styles.css"
import { Button } from "../../../components/atoms/"
import { CenterBox } from "../../../components/molecules/"
import { LoginPanel, DomainPanel } from "../../../components/organisms/"
import TextField from 'material-ui/TextField';
import type { Dispatch } from "redux"

export class IndexPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      signedin: props.signedIn,
    }
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.state.signedIn) !== JSON.stringify(nextProps.signedIn))
    {
      this.setState({ signedIn: nextProps.signedIn })
    }
  }

  render() {
    return (
      <div className={styles.root}>
        <div style={{ display: !this.state.signedIn ? 'block' : 'none' }} className={styles.signedout}>
          <LoginPanel></LoginPanel>
        </div>
        <div style={{ display: this.state.signedIn ? 'block' : 'none' }} className={styles.content}>
          <DomainPanel></DomainPanel>
        </div>
      </div>
    )
  }

}

LoginPanel.propTypes = {
  signedIn: PropTypes.bool.isRequired,
}

function mapStateToProps(state) {
  const { signedIn } = state.user
  return {
    signedIn,
  }
}

export default connect(mapStateToProps)(IndexPage)