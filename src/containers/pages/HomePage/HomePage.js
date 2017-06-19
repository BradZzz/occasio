// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import styles from "./styles.css"
import type { Dispatch } from "redux"
import Divider from 'material-ui/Divider';

export class IndexPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      info: props.tabs[props.pos],
      pos: props.pos,
    }
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.state.pos) !== JSON.stringify(nextProps.pos)) // Check if it's a new user, you can also use some unique, like the ID
    {
      const { tabs } = this.props
      this.setState({ pos: nextProps.pos })
      this.setState({ info: tabs[nextProps.pos] })
    }
  }

  render() {
    const { info } = this.state
    return (
      <div className={styles.root}>
        <h3>{ info.text }</h3>
        <Divider />
        { info.content }
      </div>
    )
  }
}

IndexPage.propTypes = {
  pos: PropTypes.number.isRequired,
  tabs: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  const { pos, tabs } = state.nav
  return {
    pos,
    tabs,
  }
}

export default connect(mapStateToProps)(IndexPage)