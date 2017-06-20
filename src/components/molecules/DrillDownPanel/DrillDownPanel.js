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
    const { data } = this.props
    const width = 500
    const height = 300
    return (
      <div className={ styles.root }>
        <Card style={{ width : width }}>
          <DrillDownChart title={ "Captured vs. Projected RAF by Year" } sub={ "RAF by Year" } height={ height } width={ width } data={ [] }/>
        </Card>
      </div>
    );
  }
}

DrillDownPanel.propTypes = {
  data: PropTypes.array.isRequired,
}

function mapStateToProps(state) {
  return { }
}

export default connect(mapStateToProps)(DrillDownPanel)