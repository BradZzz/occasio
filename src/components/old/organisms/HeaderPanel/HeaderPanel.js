// @flow
import React, { Component, PropTypes } from "react"
import { Name, Button } from "../../../components/atoms/"
import { CenterBox, LogoutButton, UsrImgBox } from "../../../components/molecules/"
import { connect } from "react-redux"
import { browserHistory } from 'react-router'
import styles from "./styles.css"

const imgStyle = {
  display: 'inline-flex',
  border: '1px solid #ffffff',
}

const nameStyle = {
  display: 'inline-flex',
  height: "100%",
  position: "relative",
  "vertical-align": "super",
  margin: "0 0 0 1em",
  bottom: "5px",
  "font-weight": "bold",
  color: "white",
  width: "150px",
}

const buttonStyle = {
  display: 'inline-flex',
  position: 'absolute',
  margin: '.05em 0 0 0',
}

export class HeaderPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      signedin: props.signedIn
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
    return (
      <div className={styles.root} style={{ display: this.state.signedIn ? 'block' : 'none' }}>
        <div className={styles.navWrap} style={{ zIndex: '1' }}>
          <span className={styles.nav} onClick={ () => browserHistory.push('/domains') }>
            Domains
          </span>
          <span className={styles.nav} onClick={ () => browserHistory.push('/auctions') }>
            Auctions
          </span>
        </div>
        <CenterBox align="right" height="50px">
          <div className="flex layout-row layout-align-end-center" style={{ height: "100%"}}>
            <div style={{ "cursor": "pointer", "width" : "210px", "display" : "inline-block" }} onClick={ () => browserHistory.push('/profile') }>
              <UsrImgBox style={ imgStyle }></UsrImgBox>
              <Name style={ nameStyle }></Name>
            </div>
            <LogoutButton style={ buttonStyle }></LogoutButton>
          </div>
        </CenterBox>
      </div>
    )
  }
}

HeaderPanel.propTypes = {
  signedIn: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  meta: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { signedIn, isFetching, meta } = state.user
  return {
    signedIn,
    isFetching,
    meta,
  }
}

export default connect(mapStateToProps)(HeaderPanel)