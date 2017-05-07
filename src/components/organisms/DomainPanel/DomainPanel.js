// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { FoldingCube } from "../../../components/atoms/"
import { ActionButton, DomainList, DomainSpecific } from "../../../components/molecules/"
import styles from "./styles.css"

export class DomainPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      details: props.details,
      isFetching: props.isFetching
    }
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.state.details) !== JSON.stringify(nextProps.details))
    {
      this.setState({ details: nextProps.details })
    }
    if(JSON.stringify(this.state.isFetching) !== JSON.stringify(nextProps.isFetching))
    {
      this.setState({ isFetching: nextProps.isFetching })
    }
  }

  render() {
    const { details, isFetching } = this.state
    return (
      <div className={styles.root + ' columnFlex'} >
        <div style={{ 'display' : isFetching ? 'block' : 'none' }}>
          <FoldingCube style={{ 'marginTop' : '5em' }}></FoldingCube>
        </div>
        <div style={{ visibility: !details && !isFetching ? 'visible' : 'hidden' }}>
          <DomainList></DomainList>
        </div>
        <div style={{ visibility: details && !isFetching ? 'visible' : 'hidden', 'overflowY' : 'auto' }}>
          <DomainSpecific></DomainSpecific>
        </div>
      </div>
    )
  }

//  render() {
//    const { details, isFetching } = this.state
//    return (
//      <div className={styles.root + ' columnFlex'} >
//        <div style={{ 'display' : isFetching ? 'block' : 'none' }}>
//          <FoldingCube style={{ 'marginTop' : '5em' }}></FoldingCube>
//        </div>
//        <div style={{ display: !details && !isFetching ? 'block' : 'none' }}>
//          <DomainList></DomainList>
//        </div>
//        <div style={{ display: details && !isFetching ? 'block' : 'none', 'overflowY' : 'auto' }}>
//          <DomainSpecific></DomainSpecific>
//        </div>
//      </div>
//    )
//  }

}

DomainPanel.propTypes = {
  details: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  const { details, isFetching } = state.domain
  return {
    details,
    isFetching,
  }
}

export default connect(mapStateToProps)(DomainPanel)