// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux"
import { ButtonFlat } from "../../atoms/"
import * as DomainActions from "../../../actions/domain"
import * as AuctionActions from "../../../actions/auction"

export class BackButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      style: props.style,
    }
  }

  action = () => {
    const { dispatch, redirect } = this.props
    if (redirect === 'domain') {
      dispatch(DomainActions.navDomGen())
    } else if (redirect === 'auction') {
      dispatch(AuctionActions.navAuctGen())
    } else if (redirect === 'auction_spec') {
      dispatch(AuctionActions.navAuctSpecRev())
    } else {
      alert('back button not configured!')
    }
  }

  render() {
    return (
      <div style={ this.state.style }>
        <ButtonFlat onClick={ this.action }>
          {this.props.children}
        </ButtonFlat>
      </div>
    )
  }
}

BackButton.propTypes = {
  redirect: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return { }
}

export default connect(mapStateToProps)(BackButton)