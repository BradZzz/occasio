// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux"
import * as UserActions from "../../../actions/user"

export class Name extends Component {
  constructor(props) {
    super(props)
    this.state = {
      style: props.style,
      max: 15
    }
  }

  render() {
    const { meta } = this.props
    const len = meta.name.length > this.state.max ? this.state.max : meta.name.length
    return (
      <div style={ this.state.style }>
        { meta.name.substring(0,len) }
      </div>
    )
  }
}

Name.propTypes = {
  meta: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const { meta } = state.user
  return {
    meta
  }
}

export default connect(mapStateToProps)(Name)