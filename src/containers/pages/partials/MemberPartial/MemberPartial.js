// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import styles from "./styles.css"

import { TablePanel, MemberDescPanel } from "../../../../components/molecules"

import * as MembersModelActions from "../../../../actions/models/members"
import * as MembersPartialActions from "../../../../actions/partials/members"

export class MemberPartial extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data : props.data,
      desc : props.desc,
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
    const { dispatch } = this.props
    const { desc, data, currYr } = this.state

    const columns = [{
       Header: 'Name',
       accessor: 'full_name',
       Cell: props => <span style={{ 'width': '100%', 'color':'#2196F3', 'cursor':'pointer' }} onClick={() => dispatch(MembersPartialActions.loadMemberDesc(props.original))}>{props.value}</span>
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

    //filter distinct here
    var seen = []
    var send = data.filter((dat)=>{
      if (seen.indexOf(dat.hicn) === -1){
        seen.push(dat.hicn)
        return dat
      }
    })

    let view = <TablePanel ttype="collapse" data={ send } columns={ columns } inner={ inner }/>

    if (desc) {
      view = <MemberDescPanel></MemberDescPanel>
    }

    return (
      <div className={ styles.root }>
        { view }
      </div>
    )
  }
}

MemberPartial.propTypes = {
  data: PropTypes.array.isRequired,
  desc: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { data } = state.m_members
  const { desc } = state.p_members
  return { data, desc }
}

export default connect(mapStateToProps)(MemberPartial)