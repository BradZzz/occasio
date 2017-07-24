// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux"
import Highcharts from 'highcharts'
import ReactHighcharts from 'react-highcharts'
import HighchartsDrilldown from 'highcharts/modules/drilldown'
import HighchartsMore from 'highcharts-more'

import { COLORS } from "../../../constants/application"

export class StackedBarChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      config :  {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Stacked column chart'
        },
        xAxis: {
            categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total fruit consumption'
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
            shared: true
        },
        plotOptions: {
            column: {
                stacking: 'percent'
            }
        },
        series: [{
            name: 'John',
            data: [5, 3, 4, 7, 2]
        }, {
            name: 'Jane',
            data: [2, 2, 3, 2, 1]
        }, {
            name: 'Joe',
            data: [3, 4, 4, 2, 5]
        }]
     }
    }
  }

  render() {
    const { sub, width, height, data } = this.props
    const { config } = this.state

    console.log(this.props)

    config.chart.height = height
    config.chart.width = width
    config.series[0].name = sub

//    data.chart.height = height
//    data.chart.width = width
//    data.series[0].name = sub

    return (
      <div>
        <ReactHighcharts config = { config } ref="chart"/>
      </div>
    )
  }
}

StackedBarChart.propTypes = {
  sub: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return { }
}

export default connect(mapStateToProps)(StackedBarChart)