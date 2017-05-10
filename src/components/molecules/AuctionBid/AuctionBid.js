// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { BackButton, AuctionBidButton } from "../../../components/molecules/"
import styles from "./styles.css"

const buttonStyle = { }

export class AuctionBid extends Component {
  constructor(props) {
    super(props)
    this.state = {
      specific : props.specific,
      disclaimer : "Be careful before clicking the button below. All bids are tied to social accounts and legally binding. " +
        "For questions/concerns feel free to review our terms and conditions located here."
    }
  }

  render() {
    const { specific, disclaimer  } = this.state
    const top = specific.bids[specific.bids.length - 1]

    return (
      <div className={ styles.root }>
        <BackButton redirect="auction_spec" style={ buttonStyle }>Back</BackButton>
        <div>Bid</div>

        <div>
          { disclaimer }
        </div>
        <BackButton redirect="auction_spec" style={ buttonStyle }>Place Bid</BackButton>
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