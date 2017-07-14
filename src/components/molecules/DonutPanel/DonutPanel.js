// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux"
import { Card } from 'material-ui/Card';
import styles from "./styles.css"

import { DonutChart } from "../../quarks/"

export class DonutPanel extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { data } = this.props
    const width = 150
    const height = 150
    return (
      <div className={ styles.root }>
        <Card style={{ width : width }}>
          <p>2017</p>
          <DonutChart data = { data[0] } height={ height } width={ width }/>
          <p>2016</p>
          <DonutChart data = { data[1] } height={ height } width={ width }/>
          <p>2015</p>
          <DonutChart data = { data[2] } height={ height } width={ width }/>
        </Card>
      </div>
    );
  }
}

DonutPanel.propTypes = {
  title: PropTypes.string.isRequired,
  sub: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
}

function mapStateToProps(state) {
  return { }
}

export default connect(mapStateToProps)(DonutPanel)