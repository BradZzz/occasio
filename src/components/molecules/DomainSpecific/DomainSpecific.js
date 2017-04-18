// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { BackButton } from "../../../components/molecules/"
import styles from "./styles.css"

const buttonStyle = { }

export class DomainSpecific extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { specific } = this.props
    return (
      <div>
        { specific }
        <BackButton style={ buttonStyle }>Back</BackButton>
      </div>
    )
  }
}

DomainSpecific.propTypes = {
  specific: PropTypes.string.isRequired
}

function mapStateToProps(state) {
  const { specific } = state.domain
  return {
    specific,
  }
}

export default connect(mapStateToProps)(DomainSpecific)