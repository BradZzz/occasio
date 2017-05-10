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
    return (
      <div className={ styles.root }>
        <img src={ specific.image } className={ styles.image }/>
        <span className={ styles.price }>{ specific.minimum }</span>
      </div>
    )
  }
}

AuctionImg.propTypes = {
  specific: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const { specific } = state.auction
  return {
    specific
  }
}

export default connect(mapStateToProps)(AuctionImg)