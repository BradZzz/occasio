// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import styles from "./styles.css"

import * as DashboardPActions from "../../../actions/partials/dashboard"

export class CardPanel extends Component {
  constructor(props) {
    super(props)
  }

  action = () => {
    const { idx, dispatch } = this.props
    dispatch(DashboardPActions.dashReq({ pos:idx, exp:true }))
  }

  render() {
    const { img, title, sub, txt } = this.props
    return (
      <div className={styles.root}>
        <Card>
          <CardMedia overlay={<CardTitle title={ title } subtitle={ sub } />} >
            <img src={ img } alt="" />
          </CardMedia>
          <CardText>
            { txt }
          </CardText>
          <CardActions>
            <FlatButton label="Expand" onClick={() => this.action()}/>
          </CardActions>
        </Card>
      </div>
    )
  }
}

CardPanel.propTypes = {
  idx: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  sub: PropTypes.string.isRequired,
  txt: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return { }
}

export default connect(mapStateToProps)(CardPanel)