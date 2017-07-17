// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux"
import Highcharts from 'highcharts'
import ReactHighcharts from 'react-highcharts'
import HighchartsDrilldown from 'highcharts/modules/drilldown'
import HighchartsMore from 'highcharts-more'

import { COLORS } from "../../../constants/application"

export class LineChart extends Component {
  constructor(props) {
     super(props)
  }

  render() {
    const { sub, width, height, data } = this.props

    data.chart.height = height
    data.chart.width = width
    data.series[0].name = sub

    return (
      <div>
        <ReactHighcharts config = { data } ref="chart"/>
      </div>
    )
  }
}

LineChart.propTypes = {
  sub: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return { }
}

export default connect(mapStateToProps)(LineChart)