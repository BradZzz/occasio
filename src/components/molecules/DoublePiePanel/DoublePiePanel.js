// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux"
import { Card } from 'material-ui/Card';
import styles from "./styles.css"
import ReactHighcharts from 'react-highcharts'

import { DoublePie } from '../../quarks';

export class DoublePiePanel extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { title, width, height, data } = this.props
    return (
      <div className={ styles.root }>
        <Card style={{ width : "100%" }}>
          <p>{ title }</p>
          <DoublePie width={ width } height={ height } data={ data } sub={""}/>
        </Card>
      </div>
    );
  }
}

DoublePiePanel.propTypes = {
  title: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
}

function mapStateToProps(state) {
  return { }
}

export default connect(mapStateToProps)(DoublePiePanel)