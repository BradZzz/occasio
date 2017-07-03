// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import styles from "./styles.css"

import * as DashboardPActions from "../../../actions/partials/dashboard"

export class CardExpPanel extends Component {
  constructor(props) {
    super(props)
  }

  action = () => {
    const { dispatch } = this.props
    dispatch(DashboardPActions.dashReq({}))
  }

  render() {
    const { pos, cards } = this.props
    const card = cards[pos]
    return (
      <div className={styles.root}>
        <Card>
          <CardMedia overlay={<CardTitle title={ card.title } subtitle={ card.sub } />} >
            <img src={ card.img } alt="" />
          </CardMedia>
          <CardText>
            { card.txt }
          </CardText>
          <CardActions>
            <FlatButton label="Close" onClick={() => this.action()}/>
          </CardActions>
        </Card>
      </div>
    )
  }
}

CardExpPanel.propTypes = {
  pos: PropTypes.number.isRequired,
  cards: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  const { pos, cards } = state.p_dash
  return {
    pos,
    cards,
  }
}

export default connect(mapStateToProps)(CardExpPanel)