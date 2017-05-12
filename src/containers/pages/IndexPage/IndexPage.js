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
import * as DomainActions from "../../../actions/domain"
import * as BidActions from "../../../actions/bids"

export class IndexPage extends Component {
  constructor(props) {
    super(props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn) {
      const { dispatch } = this.props
      dispatch(DomainActions.queryDomains({ period : 90 }))
      dispatch(BidActions.queryBids({ }))
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
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  const { signedIn } = state.user
  return {
    signedIn,
  }
}

export default connect(mapStateToProps)(IndexPage)