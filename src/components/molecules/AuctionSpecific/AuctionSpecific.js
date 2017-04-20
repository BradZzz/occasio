// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { BackButton } from "../../../components/molecules/"
import styles from "./styles.css"

const buttonStyle = { }

export class AuctionSpecific extends Component {
  constructor(props) {
    super(props)
  }

  renderField = (dom, idx) => {
    return (
      <div key={ idx }>
        <div>{dom.uuid}</div>
        <div>{dom.bid}</div>
        <div>{dom.placed}</div>
      </div>
    )
  }

  render() {
    const { specific } = this.props
    return (
      <div>
        { specific.name }
        { specific.expires }
        { specific.bids.map(this.renderField) }
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