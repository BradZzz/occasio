// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import styles from "./styles.css"
import { TablePanel, ProviderDescPanel } from "../../../../components/molecules"
import { ListDetailPanel } from "../../../../components/organisms"

import * as ProviderModelActions from "../../../../actions/models/providers"
import * as ProviderPartialActions from "../../../../actions/partials/providers"

export class ProviderPartial extends Component {
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
    const { dispatch } = this.props

    const columns = [
      { Header: 'Name', accessor: 'full_name',
        Cell: props => <span style={{ 'width': '100%', 'color':'#2196F3', 'cursor':'pointer' }}
          onClick={() => {
            this.setState({ idx: props.index })
            dispatch(ProviderPartialActions.loadProviderDesc(props.original))
          }}>{props.value}</span>
      },
      { Header: currYr + ' Eligible Members', accessor: 'current_num_eligible_members' },
      { Header: currYr + ' Avg RAF', accessor: 'current_avg_raf_captured' },
      { Header: currYr + ' Avg Opportunity', accessor: 'current_avg_opportunity' },
      { Header: 'Opportunity Score', accessor: 'opportunity_score' },
      { Header: currYr + ' Recapture Rate', accessor: 'current_recapture_rate' },
    ]

    const inner = [
      { Header: (currYr - 1) + ' AVG RAF', accessor: 'prior_avg_raf_captured' },
      { Header: (currYr - 1) + ' AVG Opportunity', accessor: 'prior_avg_opportunity' },
      { Header: (currYr - 1) + ' Recapture Rate', accessor: 'prior_recapture_rate' },
      { Header: 'NPI', accessor: 'npi' },
    ]

    let view = <TablePanel ttype="collapse" data={ data } columns={ columns } inner={ inner }/>

    if (desc) {
      const click = () => dispatch(ProviderPartialActions.unloadProviderDesc({}))
      view = <ListDetailPanel data={ data } idx={ idx } dataKey={ "npi" } click={ click }/>
    }

    return (
      <div className={ styles.root }>
        { view }
      </div>
    )
  }
}

ProviderPartial.propTypes = {
  data: PropTypes.array.isRequired,
  desc: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { unique:data } = state.m_providers
  const { desc } = state.p_providers
  return { data, desc }
}

export default connect(mapStateToProps)(ProviderPartial)