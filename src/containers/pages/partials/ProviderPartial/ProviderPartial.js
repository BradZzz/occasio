// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import styles from "./styles.css"
import { TablePanel } from "../../../../components/molecules"

import * as ProviderActions from "../../../../actions/models/providers"

export class ProviderPartial extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data : props.data,
      isFetching : props.isFetching,
      currYr : new Date().getFullYear(),
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    const { data } = this.state
    if (data.length < 1) {
      dispatch(ProviderActions.queryProviders({ }))
    }
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.state.data) !== JSON.stringify(nextProps.data)) // Check if it's a new user, you can also use some unique, like the ID
    {
      this.setState({ data: nextProps.data })
    }
    if(JSON.stringify(this.state.isFetching) !== JSON.stringify(nextProps.isFetching)) // Check if it's a new user, you can also use some unique, like the ID
    {
      this.setState({ isFetching: nextProps.isFetching })
    }
  }

  render() {
    const { data, currYr } = this.state

    const columns = [
      { Header: 'Name', accessor: 'full_name' },
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

    return (
      <div className={ styles.root }>
        <TablePanel ttype="collapse" data={ data } columns={ columns } inner={ inner }/>
      </div>
    )
  }
}

ProviderPartial.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { isFetching, data } = state.m_providers
  return { isFetching, data }
}

export default connect(mapStateToProps)(ProviderPartial)