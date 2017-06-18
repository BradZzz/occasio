// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux"
import styles from "./styles.css"

export class NSNotifier extends Component {
  constructor(props) {
    super(props)
    this.state = {
      backOrderName : props.backOrderName,
      info : props.info,
      specific : props.specific,
    }
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.state.backOrderName) !== JSON.stringify(nextProps.backOrderName))
    {
      this.setState({ backOrderName: nextProps.backOrderName })
    }
    if(JSON.stringify(this.state.info) !== JSON.stringify(nextProps.info))
    {
      this.setState({ info: nextProps.info })
    }
    if(JSON.stringify(this.state.specific) !== JSON.stringify(nextProps.specific))
    {
      this.setState({ specific: nextProps.specific })
    }
  }

  render() {
    const { info, backOrderName, specific } = this.state
    console.log(this.state)
    let notice = ""
    if (specific === backOrderName) {
      notice = JSON.stringify(info)
    }
    return (
      <div className={ styles.root }>
        <span>{ notice }</span>
      </div>
    )
  }
}

NSNotifier.propTypes = {
  backOrderName: PropTypes.string.isRequired,
  info: PropTypes.object.isRequired,
  specific: PropTypes.string.isRequired,
}

function mapStateToProps(state) {
  const { boName : backOrderName, metaBackorder : info } = state.namespace
  const { specific } = state.domain
  return {
    backOrderName,
    info,
    specific,
  }
}

export default connect(mapStateToProps)(NSNotifier)