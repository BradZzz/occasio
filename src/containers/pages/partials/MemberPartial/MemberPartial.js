// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import styles from "./styles.css"
import * as HomeActions from "../../../../actions/partials/home"
import { FoldingCubeHome } from "../../../../components/atoms"
import { DrillDownPanel, DonutPanel } from "../../../../components/molecules"
import Divider from 'material-ui/Divider'
import ReactHighcharts from 'react-highcharts'

export class MemberPartial extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [["Captured",67],["Missed",33]],
      dataP: [[["Captured",67],["Missed",33]],[["Captured",54],["Missed",46]],[["Captured",21],["Missed",79]]]
    }
  }

//  componentDidMount() {
//    const self = this;
//    setTimeout(function () {
//      self.setState({
//        config:{
//          xAxis: {
//            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May']
//          },
//          series: [{
//            data: [29.9, 71.5, 106.4, 129.2, 144.0]
//          }]
//        },
//      })
//    },3000)
//  }

  render() {
    const { data, dataP } = this.state
    return (
      <div className={ styles.root }>
        <DrillDownPanel data={ [] }/>
        <DonutPanel data = { dataP } />
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