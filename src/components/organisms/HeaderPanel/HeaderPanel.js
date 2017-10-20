// @flow
import React, { Component, PropTypes } from "react"
import { Name, Button } from "../../../components/atoms/"
import { CenterBox, LogoutButton, UsrImgBox } from "../../../components/atoms/"
import { connect } from "react-redux"
import { browserHistory } from 'react-router'
import styles from "./styles.css"

import HardwareKeyboardArrowRight from "material-ui/svg-icons/hardware/keyboard-arrow-right"
import HardwareKeyboardArrowLeft from "material-ui/svg-icons/hardware/keyboard-arrow-left"
import * as NavActions from "../../../actions/nav"
import * as BookActions from "../../../actions/books"

export class HeaderPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      book: props.book,
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
    const { expFlag } = this.state
    dispatch( NavActions.expReq({ expFlag: !expFlag }) )
  }

  removeBook = () => {
    const { dispatch } = this.props
    const { book } = this.state
    console.log("remove")
    dispatch( BookActions.navBooks({ book: '' }) )
  }

  render() {
    const { meta, dispatch, tabs, sSnap } = this.props
    const { book, signedIn, info, expFlag, pos } = this.state
    let view = (<div></div>)
    console.log(pos)
    console.log(tabs)
    const bView = book ? (
      <div onClick={() => { this.removeBook() }} style={{ width: "400px", position: "absolute", top: "10px",
        left: "10px", cursor: "pointer", "zIndex" : 2, "whiteSpace": "nowrap", overflow: "hidden", "textOverflow": "ellipsis" }}>
        <span style={{top: "7px", position:"relative"}}><HardwareKeyboardArrowLeft/></span>
        <span style={{ "marginLeft": ".4em" }}>{ book.split('_')[0] + " - " + book.split('_')[1].split('(')[0] }</span>
      </div>
     ) : (<span></span>)
    if ('desc' in sSnap[tabs[pos].partial] && sSnap[tabs[pos].partial].desc) {
      view = (
        <div style={{ "width" : "50px", "position" : "absolute", "cursor" : "pointer", "zIndex" : 1, "margin" : "10px 0 0 20px" }}>
          { expFlag ? <HardwareKeyboardArrowRight onClick={ this.flip }/> : <HardwareKeyboardArrowLeft onClick={ this.flip }/> }
        </div>
      )
    }
    if (!signedIn) {
      //<img className={ styles.headImg } src='./images/logo_header.png'/>
      return (
        <div className={styles.root} style={{ height: "60px" }}>
        </div>
      )
    } else {
      return (
        <div className={styles.root}>
          { view }
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
  const { book } = state.books
  const { signedIn, isFetching, meta } = state.user
  const { pos, tabs, expFlag } = state.nav
  const sSnap = state
  return {
    book,
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