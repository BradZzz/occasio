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
    const { data } = this.state
    const columns = [
    { Header: 'Provider ID', accessor: 'provider_id' },
    { Header: 'First', accessor: 'first_name' },
    { Header: 'Last', accessor: 'last_name' },
    { Header: 'Specialty', accessor: 'provider_type' },
    { Header: 'Address', accessor: 'address_1' },
    { Header: 'City', accessor: 'city' },
    { Header: 'State', accessor: 'state' },
    { Header: 'Zip', accessor: 'zip' },
    ]

    return (
      <div className={ styles.root }>
        <TablePanel ttype="collapse" data={ data } columns={ columns }/>
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