// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import * as DomainActions from "../../../actions/domain"
import { ActionButton } from "../../../components/molecules/"
import Infinite from 'react-infinite'
import styles from "./styles.css"

const buttonStyle = { }

export class DomainList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      asc: true,
      sort: 'name',
      meta: props.meta,
    }
  }

  sortCol = (field) => {
    const { dispatch } = this.props
    const { asc } = this.state

    switch(field){
      case 'name':  dispatch(DomainActions.sortDomName({ asc : asc })); break;
      case 'appraisal':  dispatch(DomainActions.sortDomApp({ asc : asc })); break;
      case 'expires':  dispatch(DomainActions.sortDomExp({ asc : asc })); break;
      default:  dispatch(DomainActions.sortDomExp({ asc : asc })); break;
    }

    this.setState({ sort: field })
    this.setState({ asc: !asc })
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.state.meta) !== JSON.stringify(nextProps.meta))
    {
      this.setState({ meta: nextProps.meta })
    }
  }

  renderField = (dom, idx) => {
    const { metaApp } = this.state
    const d = new Date(dom.expires)
    const formDate = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear()
    const name = dom.name
    console.log()
    const appraisal = dom.meta.appraised_value || 0
    return (
      <div className={ styles.lItem + ' rowFlex' } key={dom._id}>
        <div className={ styles.lItemField }>{ name }</div>
        <div className={ styles.lItemField }>{ appraisal }</div>
        <div className={ styles.lItemField }>{ formDate }</div>
        <div className={ styles.lItemField }>
          <ActionButton redirect='domain' domain={ dom.name } specObj={ JSON.stringify(dom) } style={ buttonStyle }>info</ActionButton>
        </div>
      </div>
    )
  }

  renderHeader = (dom, idx) => {
    return (
      <div className={ styles.lItem + ' rowFlex ' + styles.lHeader } key={ dom._id }>
        <div onClick={() => this.sortCol('name')} className={ styles.lItemField + ' ' + styles.lHeaderField }>{ dom.name }</div>
        <div onClick={() => this.sortCol('appraisal')} className={ styles.lItemField + ' ' + styles.lHeaderField }>{ dom.appraisal }</div>
        <div onClick={() => this.sortCol('expires')} className={ styles.lItemField + ' ' + styles.lHeaderField }>{ dom.expires }</div>
        <div className={ styles.lItemField }>Action</div>
      </div>
    )
  }

  render() {
    const { meta } = this.props
    return (
      <div className={styles.root + ' columnFlex'} >
        { this.renderHeader({ _id: -1, name: 'Name', appraisal: 'Appraisal', expires: 'Expires' }) }
        <div className={styles.scrollable} >
          { meta.map(this.renderField) }
        </div>
      </div>
    )
  }
}

DomainList.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  meta: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { isFetching, meta } = state.domain
  return {
    isFetching,
    meta,
  }
}

export default connect(mapStateToProps)(DomainList)