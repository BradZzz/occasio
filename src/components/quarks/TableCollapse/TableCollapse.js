// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux"
import words from 'random-words'
import ReactTable from 'react-table'
import styles from "./styles.css"

import { COLORS } from "../../../constants/application"

export class TableCollapse extends Component {
  constructor(props) {
     super(props)
     this.state = {
       tableOptions: {
         loading: false,
         showPagination: true,
         showPageSizeOptions: true,
         showPageJump: true,
         collapseOnSortingChange: true,
         collapseOnPageChange: true,
         collapseOnDataChange: true,
         freezeWhenExpanded: false,
         filterable: false,
         sortable: true,
         resizable: true
       },
       columns: props.columns,
       data: props.data,
       inner: props.inner,
       sData: Array(5553).fill().map((_, i) => {
         return {
           firstName: words(),
           lastName: words(),
           age: Math.floor(Math.random() * 30)
         }
       }),
       sColumns: [{
          Header: 'Name',
          columns: [{
            Header: 'First Name',
            accessor: 'firstName'
          }, {
            Header: 'Last Name',
            id: 'lastName',
            accessor: d => d.lastName
          }]
       }, {
          Header: 'Info',
          columns: [{
            Header: 'Age',
            accessor: 'age'
          }]
       }]
     }
     this.setTableOption = this.setTableOption.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.state.data) !== JSON.stringify(nextProps.data))
    {
      this.setState({ data: nextProps.data })
    }
    if(JSON.stringify(this.state.columns) !== JSON.stringify(nextProps.columns))
    {
      this.setState({ columns: nextProps.columns })
    }
  }

   render () {
     const { data, columns, sData, sColumns, inner } = this.state
     let tdata = data || []
     let tcolumns = columns || []
     let tinner = inner || []

     console.log(tdata)
     console.log(tcolumns)
     console.log(tinner)

     return (
       <div className={ styles.root }>
         <div className='table-wrap'>
           <ReactTable
             className='-striped -highlight'
             data={ tdata }
             columns={ tcolumns }
             defaultPageSize={15}
             {...this.state.tableOptions}
             SubComponent={(row) => {
               return (
                 <div style={{ padding: '20px',  border: "1px solid #000", margin: "1em", "borderRadius": "5px" }}>
                   {
                     tinner.map(function(inn, idx){
                       return (
                         <div key={ idx } style={{ "width":"40%" }}>
                           <strong>{ inn.Header }: </strong>
                           <span style={{ 'float':'right' }}>{ row.original[inn.accessor] } </span>
                         </div>
                       )
                     })
                   }
                 </div>
               )
             }}
           />
         </div>
       </div>
     )
   }

   setTableOption (event) {
     const target = event.target
     const value = target.type === 'checkbox' ? target.checked : target.value
     const name = target.name
     this.setState({
       tableOptions: {
         ...this.state.tableOptions,
         [name]: value
       }
     })
   }
 }

TableCollapse.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  inner: PropTypes.array,
}

function mapStateToProps(state) {
  return { }
}

export default connect(mapStateToProps)(TableCollapse)