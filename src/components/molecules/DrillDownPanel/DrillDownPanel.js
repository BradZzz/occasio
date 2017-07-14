// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux"
import { Card } from 'material-ui/Card';
import styles from "./styles.css"

import { DrillDownChart } from "../../quarks/"

export class DrillDownPanel extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { title, sub, width, height, data } = this.props
    return (
      <div className={ styles.root }>
        <Card style={{ width : width }}>
          <p>{ title }</p>
          <DrillDownChart sub={ sub } height={ height } width={ width } data={ data }/>
        </Card>
      </div>
    );
  }
}

DrillDownPanel.propTypes = {
  title: PropTypes.string.isRequired,
  sub: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return { }
}

export default connect(mapStateToProps)(DrillDownPanel)