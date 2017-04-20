// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { ActionButton } from "../../../components/molecules/"
import * as AuctionActions from "../../../actions/auction"
import Infinite from 'react-infinite'
import styles from "./styles.css"

const buttonStyle = { }

export class AuctionList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      asc: true,
      sort: 'name',
    }
  }

  sortCol = (field) => {
    const { dispatch } = this.props
    const { asc } = this.state

    switch(field){
      case 'name':  dispatch(AuctionActions.sortAuctName({ asc : asc })); break;
      case 'expires':  dispatch(AuctionActions.sortAuctExp({ asc : asc })); break;
      default:  dispatch(AuctionActions.sortAuctExp({ asc : asc })); break;
    }

    this.setState({ sort: field })
    this.setState({ asc: !asc })
  }

  renderField = (dom, idx) => {
    const d = new Date(dom.expires)
    const formDate = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear()
    const top = dom.bids[dom.bids.length - 1]

    return (
      <div className={ styles.lItem + ' rowFlex' } key={ idx }>
        <div className={ styles.lItemField }>{dom.name}</div>
        <div className={ styles.lItemField }>{formDate}</div>
        <div className={ styles.lItemField }>{top.bid}</div>
        <div className={ styles.lItemField }>
          <ActionButton redirect='auction' domain={ dom } style={ buttonStyle }>info</ActionButton>
        </div>
      </div>
    )
  }

  renderHeader = (dom, idx) => {
    return (
      <div className={ styles.lItem + ' rowFlex ' + styles.lHeader } key={ dom._id }>
        <div onClick={() => this.sortCol('name')} className={ styles.lItemField + ' ' + styles.lHeaderField }>{ dom.name }</div>
        <div onClick={() => this.sortCol('expires')} className={ styles.lItemField + ' ' + styles.lHeaderField }>{ dom.expires }</div>
        <div className={ styles.lItemField + ' ' + styles.lHeaderField }>{ dom.bids }</div>
        <div className={ styles.lItemField }>Action</div>
      </div>
    )
  }

  render() {
    const { meta } = this.props
    return (
      <div className={styles.root + ' columnFlex'} >
        { this.renderHeader({ _id: -1, name: 'Name', expires: 'Expires', bids: 'Bid' }) }
        <div className={styles.scrollable} >
          { meta.map(this.renderField) }
        </div>
      </div>
    )
  }
}

AuctionList.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  meta: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { isFetching, meta } = state.auction
  return {
    isFetching,
    meta,
  }
}

export default connect(mapStateToProps)(AuctionList)