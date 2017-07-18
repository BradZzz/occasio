// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import styles from "./styles.css"

import { TablePanel } from "../../../../components/molecules"

import * as MembersActions from "../../../../actions/models/members"

export class MemberPartial extends Component {
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
      dispatch(MembersActions.queryMembers({ }))
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

    const columns = [{
       Header: 'Name',
       accessor: 'full_name'
    },{
       Header: 'DOB',
       accessor: 'date_of_birth'
    },{
       Header: currYr + ' RAF',
       accessor: 'current_raf_captured'
    },{
       Header: currYr + ' RAF Projected',
       accessor: 'current_raf_projected'
    },{
       Header: currYr + ' Opportunity',
       accessor: 'current_opportunity'
    },{
       Header: (currYr - 1) + ' RAF',
       accessor: 'prior_raf_captured'
    }]

    const inner = [
      { Header: 'Last DOS', accessor: 'last_encounter' },
      { Header: 'PCP', accessor: 'pcp_name' },
      { Header: (currYr - 1) + ' RAF Projected', accessor: 'prior_raf_projected' },
      { Header: (currYr - 1) + ' Opportunity', accessor: 'prior_opportunity' },
      { Header: 'Current Status', accessor: 'current_is_eligible' }
    ]

    return (
      <div className={ styles.root }>
        <TablePanel ttype="collapse" data={ data } columns={ columns } inner={ inner }/>
      </div>
    )
  }
}

MemberPartial.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { isFetching, data } = state.m_members
  return { isFetching, data }
}

export default connect(mapStateToProps)(MemberPartial)