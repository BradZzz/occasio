// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import styles from "./styles.css"

import { NavTab } from "../../../components/molecules/"
import { Collapse } from "../../../components/atoms/"
import * as BookActions from "../../../actions/books"

// Home
import ActionHome from 'material-ui/svg-icons/action/home'
//Dashboard
import SocialPoll from 'material-ui/svg-icons/social/poll'
//Campaigns
import ActionWork from 'material-ui/svg-icons/action/work'
//Member Index
import SocialPeople from 'material-ui/svg-icons/social/people'
//Provider Index
import SocialLocationCity from 'material-ui/svg-icons/social/location-city'
//Downloads
import ContentArchive from 'material-ui/svg-icons/content/archive'
import { white } from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';

const iStyles = {
  height: 32,
  width: 32,
  position: "relative",
  top: "50%",
  transform: "translateY(-50%)",
}

export class NavPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      book: props.book,
      dataList: props.dataList,
      isFetchingSearch: props.isFetchingSearch,
      signedIn: props.signedIn,
      tabs: props.tabs,
    }
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.state.signedIn) !== JSON.stringify(nextProps.signedIn)) // Check if it's a new user, you can also use some unique, like the ID
    {
      this.setState({ signedIn: nextProps.signedIn })
    }
    if(JSON.stringify(this.state.book) !== JSON.stringify(nextProps.book)) // Check if it's a new user, you can also use some unique, like the ID
    {
      this.setState({ book: nextProps.book })
    }
    if(JSON.stringify(this.state.dataList) !== JSON.stringify(nextProps.dataList)) // Check if it's a new user, you can also use some unique, like the ID
    {
      this.setState({ dataList: nextProps.dataList })
    }
    if(JSON.stringify(this.state.isFetchingSearch) !== JSON.stringify(nextProps.isFetchingSearch)) // Check if it's a new user, you can also use some unique, like the ID
    {
      this.setState({ isFetchingSearch: nextProps.isFetchingSearch })
    }
  }

  truncate = (str, max) => {
    return str.length > max ? str.substr(0, max-1) + '…' : str;
  }

  tabs = () => {
    const { signedIn, tabs } = this.state
    if (signedIn) {
      return tabs.map( (tab, idx) => {
        return <NavTab key={ idx } idx={ idx } icon={ tab.icon }
            nav={ tab.nav } text={ tab.text }/>
      })
    } else {
      return ( <div></div> )
    }
  }

  action = (part) => {
    const { dispatch } = this.props
    console.log(part)
    dispatch( BookActions.querySearchBooksComp({ book: part }) )
  }

  list = (part,idx) => {
    const { book } = this.state
    const name = part.replace("(analysis).json","")
    const sName = book.split("_")[0] || ""
    const bName = name.split("_")[0]
    const bAuth = name.split("_")[1]
    return (<div key={ idx } onClick={() => { this.action(part) } } className={styles.parent + (sName === bName ? " hide" : "") } style={{ cursor: "pointer", height: "80px", "marginLeft": "1em" }}>
        <div className={styles.container} style={{ display: "flex", "flexDirection": "column" }}>
          <span className={styles.title}>{this.truncate(bName,32)}</span>
          <span className={styles.author}>{this.truncate(bAuth,20)}</span>
        </div>
    </div>)
  }

  render() {
    const { book, dataList, isFetchingSearch } = this.state
    //{ this.tabs() }
    const sView = book && !isFetchingSearch ? dataList.map(this.list) : <span></span>
    return (
      <div className={styles.root}>
        <div className={styles.navLogo} style={{ "borderBottom": "1px solid", "maxHeight": "60px" }}>
          <img src='./images/logo_nav.png'/>
        </div>
        <div style={{ "overflowY": "auto", position: "relative", height: "92vh", "paddingTop": "1em" }}>
          { sView }
        </div>
      </div>
    )
  }
}

NavPanel.propTypes = {
  book: PropTypes.string.isRequired,
  dataList: PropTypes.array.isRequired,
  isFetchingSearch: PropTypes.bool.isRequired,
  tabs: PropTypes.array.isRequired,
  signedIn: PropTypes.bool.isRequired,
}

function mapStateToProps(state) {
  const { book, dataList, isFetchingSearch } = state.books
  const { tabs } = state.nav
  const { signedIn } = state.user
  return {
    book,
    dataList,
    isFetchingSearch,
    tabs,
    signedIn,
  }
}

export default connect(mapStateToProps)(NavPanel)