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
    const { data } = this.state
    const columns = [{
       Header: 'Provider ID',
       accessor: 'provider_dbid'
    },{
       Header: 'First',
       accessor: 'first_name'
    },{
       Header: 'Last',
       accessor: 'last_name'
    },{
       Header: 'Provider Name',
       accessor: 'pcp_name'
    }]

    return (
      <div className={ styles.root }>
        <TablePanel ttype="collapse" data={ data } columns={ columns }/>
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