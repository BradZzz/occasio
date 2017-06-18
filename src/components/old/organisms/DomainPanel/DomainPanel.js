// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { FoldingCube } from "../../../components/atoms/"
import { ActionButton, DomainList, DomainSpecific, BackButton, BackOrderButton } from "../../../components/molecules/"
import styles from "./styles.css"

export class DomainPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      details: props.details,
      isFetching: props.isFetching,
      name: props.name,
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
    if(JSON.stringify(this.state.name) !== JSON.stringify(nextProps.name))
    {
      this.setState({ name: nextProps.name })
    }
  }

  render() {
    const { details, isFetching, name } = this.state
    return (
      <div className={styles.root + ' columnFlex'} >
        <div style={{ 'display' : isFetching ? 'block' : 'none' }}>
          <FoldingCube style={{ 'marginTop' : '5em' }}></FoldingCube>
        </div>
        <div style={{ visibility: !details && !isFetching ? 'visible' : 'hidden' }}>
          <DomainList></DomainList>
        </div>
        <div className={styles.specific} style={{ visibility: details && !isFetching ? 'visible' : 'hidden' }}>
          <div className={styles.bPanel}>
            <BackButton redirect="domain" style={{ 'width' : 150, 'display' : 'flex', 'padding' : '0 10px' }}>Back</BackButton>
            <BackOrderButton name={ name } style={{ 'width' : 150, 'display' : 'flex', 'padding' : '0 10px' }}>BackOrder</BackOrderButton>
          </div>
          <div style={{ 'overflowY' : 'auto', 'max-height': '76vh' }}>
            <DomainSpecific></DomainSpecific>
          </div>
        </div>
      </div>
    )
  }
}

DomainPanel.propTypes = {
  details: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired
}

function mapStateToProps(state) {
  const { details, isFetching, specific : name } = state.domain
  return {
    details,
    isFetching,
    name,
  }
}

export default connect(mapStateToProps)(DomainPanel)