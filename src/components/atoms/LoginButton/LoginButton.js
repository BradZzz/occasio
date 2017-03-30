// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux"
import { Button } from "../../atoms/"
import { Link } from "react-router";
import * as UserActions from "../../../actions/user"

export class LoginButton extends Component {
  constructor(props) {
    super(props)
  }

  login = () => {
    window.open('/auth');
  }

  render() {
    const { signedIn, isFetching } = this.props
    return (
      <div>
        <Button><Link to="/auth/" target="_blank">Log In</Link></Button>
      </div>
    )
  }
}

LoginButton.propTypes = {
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return { }
}

export default connect(mapStateToProps)(LoginButton)