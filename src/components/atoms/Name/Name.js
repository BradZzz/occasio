// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux"
import * as UserActions from "../../../actions/user"

export class Name extends Component {
  constructor(props) {
    super(props)
    this.state = {
      style: props.style,
      pstyles:[{
        display: 'inline-flex',
        height: "100%",
        position: "relative",
        "vertical-align": "super",
        margin: "0 0 0 1em",
        bottom: "5px",
        "font-weight": "bold",
        width: "150px",
      }],
      max: 15,
    }
  }

  render() {
    const { meta } = this.props
    const { style, pstyles } = this.state
    const len = meta.name.length > this.state.max ? this.state.max : meta.name.length
    return (
      <div style={ pstyles[style] }>
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