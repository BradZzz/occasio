// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { Countdown } from "../../../components/atoms/"
import { BackButton, AuctionBidButton } from "../../../components/molecules/"
import styles from "./styles.css"

const buttonStyle = { }

export class AuctionSpecific extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { specific } = this.props
    const top = specific.bids[specific.bids.length - 1]

    return (
      <div className={ styles.root }>
        <h1>{ specific.name }</h1>
        <Countdown date={ specific.expires } style={{ 'width': '50%' }}></Countdown>
        <div>Start Date: { specific.start }</div>
        <div>Last Bid: { top.placed }</div>
        <div>Current Price: { top.bid }</div>
        <div>Estibot Appraisal: Not available yet</div>
        <div>No. of Bids: { specific.bids.length }</div>
        <div style={{ 'marginBottom': '1em' }}>End Date: { specific.expires }</div>
        <AuctionBidButton style={{ 'marginBottom': '1em' }}>Place Bid</AuctionBidButton>
        <BackButton redirect="auction" style={ buttonStyle }>Back</BackButton>
      </div>
    )
  }
}

AuctionSpecific.propTypes = {
  specific: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const { specific } = state.auction
  return {
    specific,
  }
}

export default connect(mapStateToProps)(AuctionSpecific)