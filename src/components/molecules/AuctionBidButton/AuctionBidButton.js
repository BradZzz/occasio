// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux"
import { Button } from "../../atoms/"
import * as AuctionActions from "../../../actions/auction"

export class AuctionBidButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      style: props.style,
      domain: props.domain,
    }
  }

  action = () => {
    console.log("Auction Bid")
    const { dispatch } = this.props
    dispatch(AuctionActions.navAuctBid())
  }

  render() {
    return (
      <div style={ this.state.style }>
        <Button onClick={ this.action }>
          {this.props.children}
        </Button>
      </div>
    )
  }
}

AuctionBidButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return { }
}

export default connect(mapStateToProps)(AuctionBidButton)