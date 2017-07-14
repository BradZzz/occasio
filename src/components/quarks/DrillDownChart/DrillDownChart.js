// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux"
import Highcharts from 'highcharts'
import ReactHighcharts from 'react-highcharts'
import HighchartsDrilldown from 'highcharts/modules/drilldown'
import HighchartsMore from 'highcharts-more'

import { COLORS } from "../../../constants/application"

export class DrillDownChart extends Component {
  constructor(props) {
     super(props)
     console.log(COLORS)
     this.state = {
        config : { colors: COLORS,
           chart: { type: 'column' },
           title: { text: '' },
           subtitle: { text: '' },
           xAxis: {
             type: 'category',
             lineColor: 'transparent',
             lineWidth: 0,
             minorGridLineWidth: 0,
             labels: { enabled: true },
             minorTickLength: 0,
             tickLength: 0
           },
           yAxis: {
              title: { text: '' },
              gridLineWidth:0,
              labels: { enabled: false },
           },
           legend: { enabled: false },
           plotOptions: {
             series: {
               borderWidth: 0,
               dataLabels: { enabled: false }
             },
             candlestick: { lineColor: '#404048' }
           },
           tooltip: {
             headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
             pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
           },
           series: props.data.series,
           drilldown: props.data.drilldown,
           credits: { enabled: false }
        }
     }
  }

  componentDidMount () {
    HighchartsDrilldown(Highcharts)
    HighchartsMore(ReactHighcharts.Highcharts)
  }

  render() {
    const { config } = this.state
    const { title, sub, width, height } = this.props

    config.chart.height = height
    config.chart.width = width
    config.series[0].name = sub

    return (
      <div>
        <ReactHighcharts config = { config } ref="chart"/>
      </div>
    )
  }
}

DrillDownChart.propTypes = {
  sub: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return { }
}

export default connect(mapStateToProps)(DrillDownChart)