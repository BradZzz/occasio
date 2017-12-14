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
    const { title, width, height, data, dataComp, nav } = this.props
    let grph = (<DoublePie width={ width } height={ height } data={ data } sub={""} nav={nav} />)
    if (dataComp) {
      grph = (
        <div style={{ display: "flex" }}>
          <DoublePie width={ width } height={ height } data={ data } sub={""} nav={nav} />
          <DoublePie width={ width } height={ height } data={ dataComp } sub={""} nav={nav} />
        </div>
      )
    }

    return (
      <div className={ styles.root }>
        <Card style={{ width : "100%" }}>
          <p>{ title }</p>
          { grph }
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
  dataComp: PropTypes.array,
  nav: PropTypes.object,
}

function mapStateToProps(state) {
  return { }
}

export default connect(mapStateToProps)(DoublePiePanel)