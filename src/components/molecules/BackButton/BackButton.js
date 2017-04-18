// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux"
import { Button } from "../../atoms/"
import * as DomainActions from "../../../actions/domain"

export class BackButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      style: props.style,
    }
  }

  action = () => {
    const { dispatch } = this.props
    dispatch(DomainActions.navDomGen())
  }

  render() {
    return (
      <div style={ this.state.style }>
        <Button onClick={ this.action }>
          {this.props.children}
        </Button>
      </div>
    )
  }
}

BackButton.propTypes = {
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return { }
}

export default connect(mapStateToProps)(BackButton)