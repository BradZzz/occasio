// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux"
import { Button } from "../../atoms/"
import * as DomainActions from "../../../actions/domain"
import * as AuctionActions from "../../../actions/auction"

export class ActionButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      style: props.style,
      domain: props.domain,
    }
  }

  action = () => {
    const { dispatch, redirect } = this.props
    if (redirect === 'domain') {
      dispatch(DomainActions.navDomSpec({ specific : this.state.domain }))
    } else if (redirect === 'auction') {
      dispatch(AuctionActions.navAuctSpec({ specific : this.state.domain }))
    } else {
      alert('back button not configured!')
    }
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

ActionButton.propTypes = {
  redirect: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return { }
}

export default connect(mapStateToProps)(ActionButton)