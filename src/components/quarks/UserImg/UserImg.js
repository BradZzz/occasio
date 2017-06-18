// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux"
import * as UserActions from "../../../actions/user"

export class UserImg extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { meta } = this.props
    return (
      <img src={ meta.photoURL } style={{ width: "100%" }}/>
    )
  }
}

UserImg.propTypes = {
  meta: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const { meta } = state.user
  return {
    meta
  }
}

export default connect(mapStateToProps)(UserImg)