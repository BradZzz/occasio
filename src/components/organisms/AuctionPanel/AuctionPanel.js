// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import * as AuctionActions from "../../../actions/auction"
import { AuctionList, AuctionSpecific, AuctionBid } from "../../../components/molecules/"
import styles from "./styles.css"

export class AuctionPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      details: props.details,
      bidding: props.bidding,
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(AuctionActions.queryAuctions())
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.state.details) !== JSON.stringify(nextProps.details))
    {
      console.log('details changed')
      this.setState({ details: nextProps.details })
    }
    if(JSON.stringify(this.state.bidding) !== JSON.stringify(nextProps.bidding))
    {
      console.log('bidding changed')
      this.setState({ bidding: nextProps.bidding })
    }
  }

  render() {
    return (
      <div className={styles.root + ' columnFlex'} >
        <div style={{ display: (!this.state.details && !this.state.bidding) ? 'block' : 'none' }}>
          <AuctionList></AuctionList>
        </div>
        <div style={{ display: (this.state.details && !this.state.bidding) ? 'block' : 'none' }}>
          <AuctionSpecific></AuctionSpecific>
        </div>
        <div style={{ display: (this.state.bidding && !this.state.details) ? 'block' : 'none' }}>
          <AuctionBid></AuctionBid>
        </div>
      </div>
    )
  }

}

AuctionPanel.propTypes = {
  details: PropTypes.bool.isRequired,
  bidding: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  const { details, bidding } = state.auction
  return {
    details,
    bidding,
  }
}

export default connect(mapStateToProps)(AuctionPanel)