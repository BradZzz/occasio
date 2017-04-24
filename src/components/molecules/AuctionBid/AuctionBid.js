// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { BackButton, AuctionBidButton } from "../../../components/molecules/"
import styles from "./styles.css"

const buttonStyle = { }

export class AuctionBid extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { specific } = this.props
    const top = specific.bids[specific.bids.length - 1]

    return (
      <div className={ styles.root }>
        <div>Bid</div>
        <BackButton redirect="auction_spec" style={ buttonStyle }>Back</BackButton>
      </div>
    )
  }
}

AuctionBid.propTypes = {
  specific: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const { specific } = state.auction
  return {
    specific,
  }
}

export default connect(mapStateToProps)(AuctionBid)