// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux"
import styles from "./styles.css"

import { Button } from "../../quarks/"
import * as UserActions from "../../../actions/user"

export class LoginPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      signedin: props.signedIn,
    }
  }

  action = () => {
    const { dispatch } = this.props
    dispatch(UserActions.login({
      name: "Joe Test",
      email: "tester@gmail.com",
      emailV: true,
      photoURL: "https://s.gravatar.com/avatar/73a2b24daecb976af81e010b7a3ce3c6?size=100&default=retro",
      uid: "0000000001",
      accessToken: "abc123",
      providerData: "email"
    }))
  }

  render() {
    return (
      <div className={ "center" }>
        <Button onClick={ this.action }> Login </Button>
      </div>
    );
  }
}

LoginPanel.propTypes = {
  signedIn: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { signedIn } = state.user
  return {
    signedIn,
  }
}

export default connect(mapStateToProps)(LoginPanel)