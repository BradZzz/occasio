// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import * as UserActions from "../../../actions/user"
import styles from "./styles.css"

import { FoldingCubeLogin } from "../../../components/atoms/"
import { LoginPanel } from "../../../components/molecules/"

export class IndexPage extends Component {
  constructor(props) {
    super(props)
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props
    if (nextProps.signedIn) {
      this.props.router.push('/home')
    } else {
      dispatch(UserActions.logout())
    }
  }

  render() {

    return (
      <div className={styles.root}>
        <FoldingCubeLogin/>
        <LoginPanel/>
      </div>
    )
  }
}

IndexPage.propTypes = {
  signedIn: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  const { signedIn } = state.user
  return {
    signedIn,
  }
}

export default connect(mapStateToProps)(IndexPage)