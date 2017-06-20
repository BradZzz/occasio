// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux"
import ReactHighcharts from 'react-highcharts'

export class DonutChart extends Component {
  constructor(props) {
     super(props)
     this.state = {
        config : {
           chart: {
             renderTo: 'container',
             type: 'pie',
           },
           title: {
             text: ''
           },
           yAxis: {
             title: {
               text: ''
             }
           },
           plotOptions: {
             pie: {
               shadow: false
             }
           },
           tooltip: {
             formatter: function() {
               return '<b>'+ this.point.name +'</b>: '+ this.y +' %';
             }
           },
           series: [{
             size: '100%',
             innerSize: '65%',
             showInLegend:false,
             dataLabels: {
               enabled: false
             }
           }],
           credits: {
             enabled: false
           }
        }
    }
  }

  render() {
    const { config } = this.state
    const { data, width, height } = this.props
    config.chart.height = height
    config.chart.width = width
    config.series[0].data = data
    return (
      <ReactHighcharts config = { config } ref="chart"/>
    )
  }
}

DonutChart.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
}

function mapStateToProps(state) {
  return { }
}

export default connect(mapStateToProps)(DonutChart)