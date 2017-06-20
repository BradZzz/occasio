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
        config : {
           colors: COLORS,
           chart: {
             type: 'column'
           },
           title: {
             text: ''
           },
           subtitle: {
             text: ''
           },
           xAxis: {
             type: 'category',
             lineColor: 'transparent',
             lineWidth: 0,
             minorGridLineWidth: 0,
             labels: {
                enabled: true
             },
             minorTickLength: 0,
             tickLength: 0
           },
           yAxis: {
              title: {
                text: ''
              },
              gridLineWidth:0,
              labels: {
                 enabled: false
              },
           },
           legend: {
             enabled: false
           },
           plotOptions: {
             series: {
               borderWidth: 0,
               dataLabels: {
                 enabled: false
               }
             },
             candlestick: {
               lineColor: '#404048'
             }
           },
           tooltip: {
             headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
             pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
           },

           series: [{
               colorByPoint: true,
               data: [{
                   name: '2015',
                   y: 33860,
                   drilldown: '2015'
               }, {
                   name: '2016',
                   y: 33290,
                   drilldown: '2016'
               }, {
                   name: '2017',
                   y: 34023,
                   drilldown: '2017'
               }]
           }],
           drilldown: {
               series: [{
                   id: '2015',
                   name: 'RAF 2015',
                   data: [
                       ['RAF', 1.187],
                       ['Opportunity', 0.251],
                       ['Projected RAF', 1.437],
                   ]
               }, {
                   id: '2016',
                   name: 'RAF 2016',
                   data: [
                       ['RAF', 1.243],
                       ['Opportunity', 0.241],
                       ['Projected RAF', 1.484],
                   ]
               }, {
                   id: '2017',
                   name: 'RAF 2017',
                   data: [
                       ['RAF', 0.937],
                       ['Opportunity', 0.381],
                       ['Projected RAF', 1.318],
                   ]
               }]
           },
           credits: {
             enabled: false
           }
        }
     }
  }

  componentDidMount () {
    HighchartsDrilldown(Highcharts)
    HighchartsMore(ReactHighcharts.Highcharts)
  }

  render() {
    const { config } = this.state
    const { data, width, height, title, sub } = this.props
    config.chart.height = height
    config.chart.width = width
    config.series[0].name = sub
    return (
      <div>
        <p>{ title }</p>
        <ReactHighcharts config = { config } ref="chart"/>
      </div>
    )
  }
}

DrillDownChart.propTypes = {
  title: PropTypes.string.isRequired,
  sub: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
}

function mapStateToProps(state) {
  return { }
}

export default connect(mapStateToProps)(DrillDownChart)