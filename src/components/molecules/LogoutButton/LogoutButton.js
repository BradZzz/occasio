// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux"
import { Button } from "../../atoms/"
import * as UserActions from "../../../actions/user"
import { Link } from 'react-router'

export class LogoutButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      style: props.style
    }
  }

  logout = () => {
    const { dispatch } = this.props
    firebase.auth().signOut().then(function() {
      dispatch(UserActions.logout())
    }, function(error) {
      dispatch(UserActions.logout())
    })
  }

  render() {
    return (
      <div style={ this.state.style }>
        <Button onClick={ this.logout }><Link to='/'>Log Out</Link></Button>
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