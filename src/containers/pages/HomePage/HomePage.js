// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import styles from "./styles.css"
import type { Dispatch } from "redux"

export class IndexPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={styles.root}>
        Homepage
      </div>
    )
  }
}

IndexPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return { }
}

export default connect(mapStateToProps)(IndexPage)