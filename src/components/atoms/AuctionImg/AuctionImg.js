// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux"
import styles from "./styles.css"
import * as AuctionActions from "../../../actions/auction"

export class AuctionImg extends Component {
  constructor(props) {
    super(props)
    this.state = {
      specific : props.specific,
    }
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.state.specific) !== JSON.stringify(nextProps.specific))
    {
      this.setState({ specific: nextProps.specific })
    }
  }

  render() {
    const { specific } = this.state
    console.log("Image")
    console.log(specific)
//    let top = { uuid : specific.usrID, bid : specific.minimum, placed: specific.created }
//    if (specific.bids.length > 0) {
//      top = specific.bids[specific.bids.length - 1]
//    }

    const { bidmap } = this.props
    let top = { bid : specific.minimum }
    if ("_id" in specific && specific._id in bidmap) {
      top = { bid : Math.max.apply( Math, bidmap[specific._id].map(function(o){ return o.amount }) ) }
    }

    return (
      <div className={ styles.root }>
        <img src={ specific.image } className={ styles.image }/>
        <span className={ styles.price }>${ top.bid }</span>
      </div>
    )
  }
}

AuctionImg.propTypes = {
  bidmap: PropTypes.object.isRequired,
  specific: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const { meta : bidmap } = state.bids
  const { specific } = state.auction
  return {
    bidmap,
    specific
  }
}

export default connect(mapStateToProps)(AuctionImg)