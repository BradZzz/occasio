// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux"
import FlatButton from 'material-ui/FlatButton';
import styles from "./styles.css"

import { Button } from "../../quarks/"
import * as NavActions from "../../../actions/nav"

const bStyle = {
  color:"#fff",
  textAlign: 'left',
  float:"left",
}

export class NavTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pos: props.pos,
      text: props.text,
      icon: props.icon,
      nav: props.nav,
    }
  }

  action = (nav) => {
    const { dispatch } = this.props
    const { pos } = this.state
    console.log(nav)
    dispatch(NavActions.navReq({ pos: pos }))
  }

  render() {
    const { text, icon, nav } = this.state
    return (
      <div className={ styles.root }>
        <FlatButton
          label={ text }
          icon={ icon }
          fullWidth={ true }
          style={ bStyle }
          onClick={() => this.action(nav)}
        />
      </div>
    );
  }
}

NavTab.propTypes = {
  pos: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  nav: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return { }
}

export default connect(mapStateToProps)(NavTab)