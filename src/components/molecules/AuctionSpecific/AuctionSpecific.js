// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { AuctionImg, Countdown } from "../../../components/atoms/"
import { BackButton, AuctionBidButton } from "../../../components/molecules/"
import styles from "./styles.css"

const buttonStyle = { }

export class AuctionSpecific extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { specific } = this.props
    return (
      <div className={ styles.root }>
        <div style={{ 'marginBottom': '1em' }}>
          <BackButton redirect="auction" style={ buttonStyle }>Back</BackButton>
        </div>
        <h1>{ specific.name }</h1>
        <div style={{ width : "30%", float : "left" }} className={ styles.flexR }>
          <AuctionImg></AuctionImg>
        </div>
        <div style={{ 'border' : '1px solid #000', padding : '10px', width : "50%", float : "left", height : "250px", position : "relative" }} className={ styles.flexC }>
          <Countdown date={ specific.expires } style={{ 'width': '95%' }}></Countdown>
          <div style={{ 'width': '100%', marginBottom: ".5em" }}>{ specific.message }</div>
          <div style={{ "position" : "absolute", "bottom" : "1em" }}>
            <AuctionBidButton>Place Bid</AuctionBidButton>
          </div>
        </div>
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