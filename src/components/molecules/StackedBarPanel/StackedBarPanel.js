// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux"
import { Card } from 'material-ui/Card';
import styles from "./styles.css"
import ReactHighcharts from 'react-highcharts'

import { StackedBarChart } from '../../quarks';

export class StackedBarPanel extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { title, sub, width, height, data } = this.props
    return (
      <div className={ styles.root }>
        <Card style={{ width : width }}>
          <p>{ title }</p>
          <StackedBarChart sub={ sub } width={ width } height={ height } data={ data }/>
        </Card>
      </div>
    );
  }
}

StackedBarPanel.propTypes = {
  title: PropTypes.string.isRequired,
  sub: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return { }
}

export default connect(mapStateToProps)(StackedBarPanel)