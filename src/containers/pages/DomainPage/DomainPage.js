// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { DomainPanel } from "../../../components/organisms/"
//import * as DomainActions from "../../../actions/domain"
import styles from "./styles.css"

export class DomainPage extends Component {
  constructor(props) {
    super(props)
  }

//  componentDidMount() {
//    const { dispatch } = this.props
//    dispatch(DomainActions.queryDomains({ period : 30 }))
//  }

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.content}>
          <DomainPanel></DomainPanel>
        </div>
      </div>
    )
  }
}

DomainPage.propTypes = {
  signedIn: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  const { signedIn } = state.user
  return {
    signedIn,
  }
}

export default connect(mapStateToProps)(DomainPage)