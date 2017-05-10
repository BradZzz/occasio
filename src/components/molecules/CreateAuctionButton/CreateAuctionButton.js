// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux"
import { Button } from "../../atoms/"
import * as AuctionActions from "../../../actions/auction"

export class CreateAuctionButton extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      data: JSON.parse(props.data),
    }
  }

  action = () => {
    const { dispatch } = this.props
    const { data } = this.state

    dispatch(AuctionActions.queryCreateAuction(data))
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

CreateAuctionButton.propTypes = {
  data: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return { }
}

export default connect(mapStateToProps)(CreateAuctionButton)