// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { BackButton } from "../../../components/molecules/"
import styles from "./styles.css"
import * as WhoisActions from "../../../actions/whois"

const buttonStyle = { }

export class DomainSpecific extends Component {
  constructor(props) {
    super(props)
    this.state = {
      specific: props.specific,
      specObj: props.specObj,
    }
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.state.specific) !== JSON.stringify(nextProps.specific))
    {
      this.setState({ specific: nextProps.specific })
    }
    if(JSON.stringify(this.state.specObj) !== JSON.stringify(nextProps.specObj))
    {
      this.setState({ specObj: nextProps.specObj })
    }
  }

  renderKey = (dom, idx) => {
    return (
      <div key={ idx }>
        <span>{ dom }</span>
      </div>
    )
  }

  render() {
    const { specific, specObj } = this.state
    const sObj = JSON.parse(specObj)
    console.log(specific)
    console.log(sObj)
    return (
      <div className={ styles.root }>
        <h1>{ specific }</h1>
        { Object.keys(sObj).map(function(s){ return sObj[s] }).map(this.renderKey) }
        <BackButton redirect="domain" style={ buttonStyle }>Back</BackButton>
      </div>
    )
  }
}

DomainSpecific.propTypes = {
  specific: PropTypes.string.isRequired,
  specObj: PropTypes.string.isRequired,
}

function mapStateToProps(state) {
  const { specific, specObj } = state.domain
  return {
    specific,
    specObj,
  }
}

export default connect(mapStateToProps)(DomainSpecific)