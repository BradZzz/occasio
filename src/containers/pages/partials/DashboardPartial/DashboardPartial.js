// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import styles from "./styles.css"
import { FoldingCubeHome } from "../../../../components/atoms"
import { CardPanel } from "../../../../components/organisms"

export class DashboardPartial extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return ( <CardPanel/> )
  }
}

DashboardPartial.propTypes = { }

function mapStateToProps(state) {
  return { }
}

export default connect(mapStateToProps)(DashboardPartial)