// @flow
import React, { Component, PropTypes } from "react"
import { Login, Profile, LogoutButton } from "../../../components/atoms/"
import { connect } from "react-redux"


export class LoginPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      signedin: props.signedIn,
      auth: new firebaseui.auth.AuthUI(firebase.auth())
    }
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.state.signedIn) !== JSON.stringify(nextProps.signedIn)) // Check if it's a new user, you can also use some unique, like the ID
    {
      this.setState({ signedIn: nextProps.signedIn })
    }
  }

  render() {
    return (
      <div>
        <div style={{ display: this.state.signedIn ? 'none' : 'block' }}>
          <Login auth={ this.state.auth }></Login>
        </div>
        <div style={{ display: this.state.signedIn ? 'block' : 'none' }}>
          <Profile></Profile>
          <LogoutButton auth={ this.state.auth }></LogoutButton>
        </div>
      </div>
    )
  }
}

LoginPanel.propTypes = {
  signedIn: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  const { signedIn } = state.user
  return {
    signedIn,
  }
}

export default connect(mapStateToProps)(LoginPanel)