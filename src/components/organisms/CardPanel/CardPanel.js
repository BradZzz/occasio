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
    this.state = {
      idx: props.idx,
      pos: props.pos,
      exp: props.exp
    }
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.state.exp) !== JSON.stringify(nextProps.exp)) // Check if it's a new user, you can also use some unique, like the ID
    {
      this.setState({ exp: nextProps.exp })
    }
    if(JSON.stringify(this.state.pos) !== JSON.stringify(nextProps.pos)) // Check if it's a new user, you can also use some unique, like the ID
    {
      this.setState({ pos: nextProps.pos })
    }
  }

  open = () => {
    const { idx } = this.state
    const { dispatch } = this.props
    console.log('pos')
    console.log(idx)
    dispatch(DashboardPActions.dashReq({ pos:idx, exp:true }))
  }

  close = () => {
    const { dispatch } = this.props
    dispatch(DashboardPActions.dashReq({}))
  }

  render() {
    const { idx, pos, exp } = this.state
    const { img, title, sub, txt } = this.props
    const button = exp ? (<FlatButton label="Close" onClick={() => this.close()}/>) : (<FlatButton label="Expand" onClick={() => this.open()}/>)
    const dynClass = (exp && pos === idx) ? " " + styles.active : ( !exp ? "" : " " + styles.inactive)
    return (
      <div className={ styles.root + dynClass }>
        <Card>
          <CardMedia overlay={<CardTitle title={ title } subtitle={ sub } />} >
            <img src={ img } style={{ "height": "300px" }} alt="" />
          </CardMedia>
          <CardText>
            { txt }
          </CardText>
          <CardActions>
            { button }
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
  exp: PropTypes.bool.isRequired,
  pos: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  const { exp, pos } = state.p_dash
  return {
    exp,
    pos,
  }
}

export default connect(mapStateToProps)(CardPanel)