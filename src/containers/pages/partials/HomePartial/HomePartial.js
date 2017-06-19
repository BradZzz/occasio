// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import styles from "./styles.css"


export class HomePartial extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={styles.root}>
        HomePartial Content
      </div>
    )
  }
}

HomePartial.propTypes = { }

function mapStateToProps(state) {
  return { }
}

export default connect(mapStateToProps)(HomePartial)