// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux"
import styles from "./styles.css"
import ReactHighcharts from 'react-highcharts'

import { TablePanel } from "../../../components/molecules"
import { ListDetailPanel } from "../../../components/organisms"

import * as DxActions from "../../../actions/models/dxs"
import * as HccActions from "../../../actions/models/hccs"

export class HCCPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dx: props.dx,
      hcc: props.hcc,
      member: props.member,
    }
    this.reload()
  }

  reload = () => {
    const { dispatch, member } = this.props
    dispatch(DxActions.queryDx({ member : member }))
    dispatch(HccActions.queryHcc({ member : member }))
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.state.dx) !== JSON.stringify(nextProps.dx))
    {
      this.setState({ dx: nextProps.dx })
    }
    if(JSON.stringify(this.state.hcc) !== JSON.stringify(nextProps.hcc))
    {
      this.setState({ hcc: nextProps.hcc })
    }
    if(JSON.stringify(this.state.member) !== JSON.stringify(nextProps.member))
    {
      this.setState({ member: nextProps.member })
      this.reload()
    }
  }

  render() {
    const { member, dx, hcc } = this.state

    /*
      Hcc

      DOS Year
      HCC Code
      HCC Description
      HCC Status
      RAF Value
      Dx Code(s)
      Trumped By
      Capture Date
    */

    const hccData = hcc[member]
    const columnsHcc = [
      { Header: 'DOS Year', accessor: 'year' },
      { Header: 'HCC Code', accessor: 'hcc_code' },
      { Header: 'HCC Status', accessor: 'hcc_status' },
      { Header: 'RAF Value', accessor: 'raf_captured' },
      { Header: 'Trumped By', accessor: 'is_trumped_by' },
    ]
    const innerHcc = [
      { Header: 'Member', accessor: 'member_dbid' },
    ]
    console.log(hcc)

    const hccView = <TablePanel ttype="collapse" data={ hccData } columns={ columnsHcc } inner={ innerHcc }/>

    /*
      Dx

      DX Code
      HCC Code
      CPT Code
      DOS
      POS
      Status
      Provider
    */

    const dxData = dx[member]
    const columnsDx = [
      { Header: 'DX Code', accessor: 'dxcode' },
      { Header: 'HCC Code', accessor: 'hcc_code' },
      { Header: 'DOS', accessor: 'date_of_service' },
      { Header: 'POS', accessor: 'pos' },
      { Header: 'Status', accessor: 'dx_status' },
      { Header: 'Provider', accessor: 'provider_dbid' },
    ]
    const innerDx = [
      { Header: 'Description', accessor: 'description' },
    ]
    console.log(dx)
    console.log(member)

    const dxView = <TablePanel ttype="collapse" data={ dxData } columns={ columnsDx } inner={ innerDx }/>

    return (
      <div className={ styles.root }>
        { hccView }
        { dxView }
      </div>
    );
  }
}

HCCPanel.propTypes = {
  dx: PropTypes.object.isRequired,
  hcc: PropTypes.object.isRequired,
  member: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  const { data:dx } = state.m_dxs
  const { data:hcc } = state.m_hccs
  return { dx, hcc }
}

export default connect(mapStateToProps)(HCCPanel)