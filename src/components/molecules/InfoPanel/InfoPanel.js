// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux"
import { Card, CardTitle, CardText } from 'material-ui/Card';
import styles from "./styles.css"

import { DonutChart } from "../../quarks/"

export class InfoPanel extends Component {
  constructor(props) {
    super(props)
  }

  showData = (dat, idx) => {
    return (
      <div key={ idx } className="rowFlex" style={{ 'justifyContent' : 'space-between', margin: '1em' }}>
        <div className="columnFlex">
          <span className={ styles.name }>{ dat.name }</span>
          <span className={ styles.smaller } style={{ 'textAlign' : 'left' }}>{ dat.name_sub }</span>
        </div>
        <div className="columnFlex">
          <span className={ styles.name }>{ dat.num }</span>
          <span className={ styles.smaller } style={{ 'textAlign' : 'right' }}>{ dat.num_sub }</span>
        </div>
      </div>
    )
  }

  render() {
    const { title, sub, width, data } = this.props
    return (
      <div className={ styles.root }>
        <Card style={{ width : width }}>
          <CardTitle title={ title } subtitle={ sub } />
          <CardText>
            { data.map(this.showData) }
          </CardText>
        </Card>
      </div>
    );
  }
}

InfoPanel.propTypes = {
  width: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  sub: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
}

function mapStateToProps(state) {
  return { }
}

export default connect(mapStateToProps)(InfoPanel)