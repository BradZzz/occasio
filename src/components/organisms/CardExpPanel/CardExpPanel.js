// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import FlatButton from 'material-ui/FlatButton'
import styles from "./styles.css"

import * as DashboardPActions from "../../../actions/partials/dashboard"

export class CardExpPanel extends Component {
  constructor(props) {
    super(props)
  }

  action = () => {
    const { dispatch } = this.props
    dispatch(DashboardPActions.dashReq({}))
  }

  render() {
    const { img, title, sub, txt } = this.props
    return (
      <div className={styles.root}>
        CardExpPanel
        <FlatButton label="Close" onClick={() => this.action()} />
      </div>
    )
  }
}

CardExpPanel.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return { }
}

export default connect(mapStateToProps)(CardExpPanel)