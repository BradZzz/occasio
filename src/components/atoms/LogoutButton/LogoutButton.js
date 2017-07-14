// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux"
import { Button } from "../../quarks/"
import * as UserActions from "../../../actions/user"
import { browserHistory } from 'react-router'

export class LogoutButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      style: props.style,
      pstyles: [{
        display: 'inline-flex',
        position: 'absolute',
        margin: '.05em 0 0 0',
      }]
    }
  }

  logout = () => {
    const { dispatch, router } = this.props
    dispatch(UserActions.logout())
    browserHistory.push('/');
  }

  render() {
    const { pstyles, style } = this.state
    return (
      <div style={ pstyles[style] }>
        <Button onClick={ this.logout }>Log Out</Button>
      </div>
    )
  }
}

LogoutButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return { }
}

export default connect(mapStateToProps)(LogoutButton)