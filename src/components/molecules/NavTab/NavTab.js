// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux"
import FlatButton from 'material-ui/FlatButton';
import styles from "./styles.css"

import { Button } from "../../quarks/"
import * as NavActions from "../../../actions/nav"

const bStyle = {
  textAlign: 'left',
  float:"left",
}

export class NavTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      idx: props.idx,
      pos: props.pos,
      text: props.text,
      icon: props.icon,
      nav: props.nav,
    }
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.state.pos) !== JSON.stringify(nextProps.pos)) // Check if it's a new user, you can also use some unique, like the ID
    {
      this.setState({ pos: nextProps.pos })
    }
  }

  action = (nav) => {
    const { dispatch } = this.props
    const { idx } = this.state
    console.log(nav)
    dispatch(NavActions.navReq({ pos: idx }))
  }

  active = () => {
    const { pos, idx } = this.state
    return pos === idx
  }

  findColor = () => {
    return this.active() ? '#7EBA4C' : '#fff'
  }

  findClass = () => {
    return this.active() ? styles.active : styles.inactive
  }

  render() {
    const { text, icon, nav } = this.state
    return (
      <div className={ styles.root + " " + this.findClass() }>
        <FlatButton
          label={ text }
          icon={ React.cloneElement(icon, { color: this.findColor() }) }
          fullWidth={ true }
          style={ bStyle }
          onClick={() => this.action(nav)}
        />
      </div>
    );
  }
}

NavTab.propTypes = {
  idx: PropTypes.number.isRequired,
  pos: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  nav: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { pos } = state.nav
  return {
    pos
  }
}

export default connect(mapStateToProps)(NavTab)