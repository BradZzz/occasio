// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { Card } from 'material-ui/Card'
import styles from "./styles.css"

import { TableNormal, TableCollapse } from "../../../components/quarks"

export class TablePanel extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { ttype, data, columns, inner } = this.props
    console.log(columns)
    const table = ttype && ttype === 'collapse' ?
      <TableCollapse data={ data } columns={ columns } inner={ inner }/> : <TableNormal data={ data } columns={ columns }/>;
    return (
      <div className={ styles.root }>
        <Card>
          { table }
        </Card>
      </div>
    )
  }
}

TablePanel.propTypes = {
  ttype: PropTypes.string,
  columns: PropTypes.array,
  data: PropTypes.array,
  inner: PropTypes.array,
}

function mapStateToProps(state) {
  return { }
}

export default connect(mapStateToProps)(TablePanel)