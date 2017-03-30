// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux"
import { Button } from "../../atoms/"
import * as UserActions from "../../../actions/user"

export class LogoutButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      auth: props.auth
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
      <div>
        <Button onClick={ this.logout }>Log Out</Button>
      </div>
    )
  }
}

LogoutButton.propTypes = {
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return { }
}

export default connect(mapStateToProps)(LogoutButton)