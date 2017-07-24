// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux"
import { Button } from "../../quarks/"
import * as MembersPartialActions from "../../../actions/partials/members"
import { browserHistory } from 'react-router'
import IconButton from 'material-ui/IconButton';
import styles from "./styles.css"

export class ClickActionButton extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { action } = this.props
    const style = this.props.style || {}
    const className = this.props.className || ""
    const tooltip = this.props.tooltip || ""

    console.log(this.props)
    return (
      <div className={ styles.root + " " + className } style={ style }>
        <IconButton onClick={ () => action() } style={{ "width" : "100%" }} tooltip={ tooltip } tooltipPosition={ 'bottom-right' }>
          {this.props.children}
        </IconButton>
      </div>
    )
  }
}

ClickActionButton.propTypes = {
  action: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return { }
}

export default connect(mapStateToProps)(ClickActionButton)