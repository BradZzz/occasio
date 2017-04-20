// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { Countdown } from "../../../components/atoms/"
import { BackButton } from "../../../components/molecules/"
import styles from "./styles.css"

const buttonStyle = { }

/*
  Start Date
  Tue, Apr 11th 2017, 20:40
  Last Bid
  Thu, Apr 20th 2017, 14:48
  Current Price
  $245.00
  Estibot Appraisal
  $11,000.00
  Number of Bids
  9
  End Date
  Fri, Apr 21st 2017, 12:41 EDT (UTC−04:00)
  Time Left
  18 hours, 39 minutes
*/

export class AuctionSpecific extends Component {
  constructor(props) {
    super(props)
  }

//  renderField = (dom, idx) => {
//    return (
//      <div key={ idx }>
//        <div>{dom.uuid}</div>
//        <div>{dom.bid}</div>
//        <div>{dom.placed}</div>
//      </div>
//    )
//  }

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