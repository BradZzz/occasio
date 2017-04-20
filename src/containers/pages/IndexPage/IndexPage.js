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
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn) {
      this.props.router.push('/domains')
    }
  }

  render() {
    return (
      <div className={styles.root}>
        <LoginPanel></LoginPanel>
      </div>
    )
  }
}

IndexPage.propTypes = {
  signedIn: PropTypes.bool.isRequired,
}

function mapStateToProps(state) {
  const { signedIn } = state.user
  return {
    signedIn,
  }
}

export default connect(mapStateToProps)(IndexPage)