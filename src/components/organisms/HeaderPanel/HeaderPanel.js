// @flow
import React, { Component, PropTypes } from "react"
import { Name, Button } from "../../../components/atoms/"
import { CenterBox, LogoutButton, UsrImgBox } from "../../../components/atoms/"
import { connect } from "react-redux"
import { browserHistory } from 'react-router'
import styles from "./styles.css"

import HardwareKeyboardArrowRight from "material-ui/svg-icons/hardware/keyboard-arrow-right"
import HardwareKeyboardArrowLeft from "material-ui/svg-icons/hardware/keyboard-arrow-left"
import ActionSwapVert from "material-ui/svg-icons/action/swap-vert"
import * as NavActions from "../../../actions/nav"
import * as BookActions from "../../../actions/books"

export class HeaderPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      book: props.book,
      bookComp: props.bookComp,
      info: props.tabs[props.pos],
      signedin: props.signedIn,
      pos: props.pos,
      expFlag: props.expFlag,
    }
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.state.book) !== JSON.stringify(nextProps.book))
    {
      this.setState({ book: nextProps.book })
    }
    if(JSON.stringify(this.state.bookComp) !== JSON.stringify(nextProps.bookComp))
    {
      this.setState({ bookComp: nextProps.bookComp })
    }
    if(JSON.stringify(this.state.signedIn) !== JSON.stringify(nextProps.signedIn))
    {
      this.setState({ signedIn: nextProps.signedIn })
    }
    if(JSON.stringify(this.state.expFlag) !== JSON.stringify(nextProps.expFlag))
    {
      this.setState({ expFlag: nextProps.expFlag })
    }
    if(JSON.stringify(this.state.pos) !== JSON.stringify(nextProps.pos))
    {
      this.setState({ pos: nextProps.pos })
    }
  }

  flip = () => {
    const { dispatch } = this.props
    dispatch( BookActions.swapBooks({ }) )
  }

  removeAltBook = () => {
    const { dispatch } = this.props
    dispatch( BookActions.navBooksComp({ book: '' }) )
  }

  removeBook = () => {
    const { dispatch } = this.props
    dispatch( BookActions.navBooks({ book: '' }) )
  }

  render() {
    const { meta, dispatch, tabs, sSnap } = this.props
    const { book, bookComp, signedIn, info, expFlag, pos } = this.state
    console.log(pos)
    console.log(tabs)
    const bPartView = bookComp ? (
      <span style={{ color: "#d32f2f" }}>{ bookComp.split('_')[0] + " - " + bookComp.split('_')[1].split('(')[0] }</span>
    ) : (
      ""
    )
    const bView = book ? (
      <div style={{ display: "flex", width: "500px", position: "absolute", top: "10px",
        left: "10px", cursor: "pointer", "zIndex" : 2, "whiteSpace": "nowrap", overflow: "hidden", "textOverflow": "ellipsis" }}>
        <span style={{top: "7px", position:"relative"}} onClick={() => { this.removeBook() }}><HardwareKeyboardArrowLeft/></span>
        <div style={{ "marginLeft": ".4em", display: "flex", "flexDirection": "column" }} onClick={() => { this.removeAltBook() }}>
          <span>{ book.split('_')[0] + " - " + book.split('_')[1].split('(')[0] }</span>
          { bPartView }
        </div>
        <span style={{ top: "7px", left: "5px", position: "relative" }} onClick={ this.flip }>
          <ActionSwapVert/>
        </span>
      </div>
     ) : (
      <div className={styles.navLogo} style={{ "position": "absolute", "maxWidth": "200px", "maxHeight": "60px" }}>
        <img src='./images/logo_nav_dark.png' style={{ "maxWidth": "100%", "maxHeight": "100%" }}/>
      </div>
    )
    if (!signedIn) {
      //<img className={ styles.headImg } src='./images/logo_header.png'/>
      return (
        <div className={styles.root} style={{ height: "60px" }}>
        </div>
      )
    } else {
      return (
        <div className={styles.root}>
          { bView }
          <CenterBox align="right" height="50px">
            <div className="flex layout-row layout-align-end-center" style={{ height: "100%"}}>
              <div className={ styles.profileWrap } onClick={ () => browserHistory.push('/profile') }>
                <UsrImgBox style={ 0 }></UsrImgBox>
                <Name style={ 0 }></Name>
              </div>
              <LogoutButton style={ 0 }></LogoutButton>
            </div>
          </CenterBox>
        </div>
      )
    }
  }
}

HeaderPanel.propTypes = {
  book: PropTypes.string.isRequired,
  bookComp: PropTypes.string.isRequired,
  signedIn: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  meta: PropTypes.object.isRequired,
  pos: PropTypes.number.isRequired,
  tabs: PropTypes.array.isRequired,
  expFlag: PropTypes.bool.isRequired,
  sSnap: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { book, bookComp } = state.books
  const { signedIn, isFetching, meta } = state.user
  const { pos, tabs, expFlag } = state.nav
  const sSnap = state
  return {
    book,
    bookComp,
    signedIn,
    isFetching,
    meta,
    pos,
    tabs,
    expFlag,
    sSnap
  }
}

export default connect(mapStateToProps)(HeaderPanel)