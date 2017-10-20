// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux"
import styles from "./styles.css"
import ReactHighcharts from 'react-highcharts'
import AWS from 'aws-sdk'

import { TablePanel } from "../../../components/molecules"
import { ListDetailPanel } from "../../../components/organisms"

import * as ChartActions from "../../../actions/models/charts"
import * as S3Actions from "../../../actions/s3"

AWS.config.update({
  accessKeyId: "AKIAID7C2URZAJM6XKGQ",
  secretAccessKey: "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",
})

const s3 = new AWS.S3()

export class MedicalPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      charts: props.charts,
      member: props.member,
    }
  }

  componentDidMount() {
    this.reload()
  }

  reload = () => {
    const { dispatch, member } = this.props
    dispatch(ChartActions.queryChart({ member : member }))
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.state.charts) !== JSON.stringify(nextProps.charts))
    {
      this.setState({ charts: nextProps.charts })
    }
    if(JSON.stringify(this.state.member) !== JSON.stringify(nextProps.member))
    {
      this.setState({ member: nextProps.member })
      this.reload()
    }
  }

  genDownload = (props) => {
    const { dispatch } = this.props
    const key = 'ProdCharts/' + [props.original.sfdc_client_key, props.original.project_key, props.original.file_name].join('/')
    dispatch(S3Actions.queryS3({ key : key }))
  }

  render() {
    const self = this
    const { member, charts } = this.state
    const chartData = charts[member]
    const columnsChart = [
      { Header: 'Chart ID', accessor: 'chart_id' },
      { Header: 'Provider ID', accessor: 'provider_dbid' },
      { Header: 'Captured Date', accessor: 'retrieval_date' },
      { Header: 'Download Link', accessor: 'file_name',
        Cell: props => <span className={ styles.click } style={{ 'width': '100%', 'cursor':'pointer' }}
          onClick={() => self.genDownload(props) }>Download</span>
      },
    ]
    const chartView = <TablePanel data={ chartData } columns={ columnsChart }/>
    return (
      <div className={ styles.root }>
        { chartView }
      </div>
    );
  }
}

MedicalPanel.propTypes = {
  charts: PropTypes.object.isRequired,
  member: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  const { data:charts } = state.m_charts
  return { charts }
}

export default connect(mapStateToProps)(MedicalPanel)