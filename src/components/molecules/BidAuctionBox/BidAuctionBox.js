// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux"
import styles from "./styles.css"

export class BidAuctionBox extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={ styles.root }>

      </div>
    )
  }
}

BidAuctionBox.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return { }
}

export default connect(mapStateToProps)(BidAuctionBox)