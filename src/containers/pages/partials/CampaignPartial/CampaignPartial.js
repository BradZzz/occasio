// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import styles from "./styles.css"

import { TablePanel, ProviderDescPanel } from "../../../../components/molecules"
import { ListDetailPanel } from "../../../../components/organisms"

import * as CampaignModelActions from "../../../../actions/models/campaigns"
import * as CampaignPartialActions from "../../../../actions/partials/campaigns"

export class CampaignPartial extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data : props.data,
      desc : props.desc,
      idx : 0,
      currYr : new Date().getFullYear(),
    }
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.state.data) !== JSON.stringify(nextProps.data)) // Check if it's a new user, you can also use some unique, like the ID
    {
      this.setState({ data: nextProps.data })
    }
    if(JSON.stringify(this.state.desc) !== JSON.stringify(nextProps.desc)) // Check if it's a new user, you can also use some unique, like the ID
    {
      this.setState({ desc: nextProps.desc })
    }
  }

  render() {
    const { data, currYr, desc, idx } = this.state
    const { dispatch, retNav, retCont } = this.props

    const columns = [
      { Header: 'Campaign Name', accessor: 'name',
        Cell: props => <span className={ styles.click } style={{ 'width': '100%', 'cursor':'pointer' }}
          onClick={() => {
            this.setState({ idx: props.index })
            dispatch(CampaignPartialActions.loadCampaignDesc(props.original))
          }}>{props.value}</span>
      },
      { Header: 'Status', accessor: 'status' },
      { Header: 'Type', accessor: 'campaign_type' },
      { Header: 'RAF Score at Launch', accessor: 'avg_raf_inception' },
      //Need to add actions to the last spot in this list
    ]

    const inner = [
      { Header: 'Total Members', accessor: 'current_member_count' },
      { Header: 'Start Date', accessor: 'launched' },
      { Header: 'Completed', accessor: d => { return (100 - (d.current_member_count / parseFloat(d.num_members_inception)) * 100) + "%"}},
      { Header: 'Current RAF', accessor: 'current_avg_raf' },
    ]

    let view = <TablePanel ttype="collapse" data={ data } columns={ columns } inner={ inner }/>

    if (desc) {
      const click = () => dispatch(CampaignPartialActions.unloadCampaignDesc({}))
      view = <ListDetailPanel data={ data } idx={ idx } dataKey={ "dbid" } click={ click } showKey={ "name" } nav={ retNav() } cont={ retCont() }/>
    }

    return (
      <div className={ styles.root }>
        { view }
      </div>
    )
  }
}

CampaignPartial.propTypes = {
  data: PropTypes.array.isRequired,
  desc: PropTypes.bool.isRequired,
  retCont: PropTypes.func.isRequired,
  retNav: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { data } = state.m_campaigns
  const { desc, retNav, retCont } = state.p_campaigns
  return { data, desc, retNav, retCont }
}

export default connect(mapStateToProps)(CampaignPartial)