// @flow
import React, { Component, PropTypes } from "react"
import { Name, Button } from "../../../components/atoms/"
import { CenterBox, LogoutButton, UsrImgBox } from "../../../components/atoms/"
import { connect } from "react-redux"
import { browserHistory } from 'react-router'
import styles from "./styles.css"

export class HeaderPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      info: props.tabs[props.pos],
      signedin: props.signedIn,
    }
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.state.signedIn) !== JSON.stringify(nextProps.signedIn))
    {
      this.setState({ signedIn: nextProps.signedIn })
    }
  }

  render() {
    const { meta } = this.props
    const { signedIn, info } = this.state
    if (!signedIn) {
      return (
        <div className={styles.root} style={{ height: "60px" }}>
          <img className={ styles.headImg } src='./images/logo_header.png'/>
        </div>
      )
    } else {
      return (
        <div className={styles.root}>
          <div className={ styles.navWrap }>
            <span>{ info.text }</span>
          </div>
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
  signedIn: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  meta: PropTypes.object.isRequired,
  pos: PropTypes.number.isRequired,
  tabs: PropTypes.array.isRequired,
}

function mapStateToProps(state) {
  const { signedIn, isFetching, meta } = state.user
  const { pos, tabs } = state.nav
  return {
    signedIn,
    isFetching,
    meta,
    pos,
    tabs,
  }
}

export default connect(mapStateToProps)(HeaderPanel)