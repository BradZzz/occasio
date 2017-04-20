// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
//import * as UserActions from "../../../actions/user"
import * as DomainActions from "../../../actions/domain"
import { ActionButton, DomainList, DomainSpecific } from "../../../components/molecules/"
import styles from "./styles.css"

export class AuctionPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      details: props.details
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(DomainActions.queryDomains({ period : 30 }))
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.state.details) !== JSON.stringify(nextProps.details))
    {
      this.setState({ details: nextProps.details })
    }
  }

  render() {
    return (
      <div className={styles.root + ' columnFlex'} >
        Auctions!
      </div>
    )
  }

}

AuctionPanel.propTypes = {
  details: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  const { details } = state.domain
  return {
    details,
  }
}

export default connect(mapStateToProps)(AuctionPanel)