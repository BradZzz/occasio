// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux"

import { COLORS } from "../../../constants/application"
import ReactTable from 'react-table'

export class TableNormal extends Component {
  constructor(props) {
     super(props)
     this.state = {
      sData: [{
         name: 'Tanner Linsley',
         age: 26,
         friend: {
           name: 'Jason Maurer',
           age: 23,
         }
      },{
         name: 'Bradford Smithwick',
         age: 20,
         friend: {
           name: 'Tanner Linsley',
           age: 26,
         }
      }],
      sColumns:[{
         Header: 'Name',
         accessor: 'name' // String-based value accessors!
       }, {
         Header: 'Age',
         accessor: 'age',
         Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
       }, {
         id: 'friendName', // Required because our accessor is not a string
         Header: 'Friend Name',
         accessor: d => d.friend.name // Custom value accessors!
       }, {
         Header: props => <span>Friend Age</span>, // Custom header components!
         accessor: 'friend.age'
       }]
     }
  }

  render() {
    const { sData, sColumns } = this.state
    const { data, columns } = this.props
    let tdata = data || sData || []
    let tcolumns = columns || sColumns || []

    return (
      <ReactTable data={tdata} columns={tcolumns} defaultPageSize={ 15 }/>
    )
  }
}

TableNormal.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
}

function mapStateToProps(state) {
  return { }
}

export default connect(mapStateToProps)(TableNormal)