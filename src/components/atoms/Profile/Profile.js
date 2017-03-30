// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux"
import * as UserActions from "../../../actions/user"

export class Profile extends Component {
  constructor(props) {
    super(props)
    this.fields = [ 'name', 'email',  'emailV', 'photoURL', 'uid', 'accessToken', 'providerData']
  }

  renderField = (field, idx) => {
    const { meta } = this.props
    return (
      <div key={idx}>
        Field: { field } : { meta[field] }
      </div>
    )
  }

  render() {
    const { signedIn, isFetching } = this.props
    return (
      <div>
        <div>SignedIn: { signedIn.toString() }</div>
        <div>Fetching: { isFetching.toString() }</div>
        { this.fields.map(this.renderField) }
      </div>
    )
  }
}

Profile.propTypes = {
  signedIn: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  meta: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { signedIn, isFetching, meta } = state.user
  return {
    signedIn,
    isFetching,
    meta,
  }
}

export default connect(mapStateToProps)(Profile)