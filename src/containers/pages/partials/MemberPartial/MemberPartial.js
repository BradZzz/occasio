// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import styles from "./styles.css"
import * as HomeActions from "../../../../actions/partials/home"
import { FoldingCubeHome } from "../../../../components/atoms"
import { DrillDownPanel, DonutPanel } from "../../../../components/molecules"
import Divider from 'material-ui/Divider'
import ReactHighcharts from 'react-highcharts'
import { DRILL_BAR_TEST, DONUT_CHART_TEST } from "../../../../constants/application"

export class MemberPartial extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={ styles.root }>
        <DrillDownPanel title="Captured vs. Projected RAF by Year" sub="RAF by Year" data={ DRILL_BAR_TEST } width={ 500 } height={ 300 } />
        <DonutPanel title="Some Chart" sub="some sub" data={ DONUT_CHART_TEST } width={ 300 } height={ 400 } />
      </div>
    )
  }
}

MemberPartial.propTypes = {
  feed: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { feed } = state.p_home
  return { feed }
}

export default connect(mapStateToProps)(MemberPartial)