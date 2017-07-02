// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import styles from "./styles.css"

import { NavTab } from "../../../components/molecules/"
import { Collapse } from "../../../components/atoms/"

export class CardPanel extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={styles.root}>
        <Card>
          <CardHeader
            title="URL Avatar"
            subtitle="Subtitle"
            avatar="http://www.material-ui.com/images/jsa-128.jpg"
            />
            <CardMedia overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />} >
              <img src="http://www.material-ui.com/images/nature-600-337.jpg" alt="" />
            </CardMedia>
            <CardTitle title="Card title" subtitle="Card subtitle" />
            <CardText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
              Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
              Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
            </CardText>
            <CardActions>
              <FlatButton label="Action1" />
              <FlatButton label="Action2" />
          </CardActions>
        </Card>
      </div>
    )
  }
}

CardPanel.propTypes = { }

function mapStateToProps(state) {
  return { }
}

export default connect(mapStateToProps)(CardPanel)