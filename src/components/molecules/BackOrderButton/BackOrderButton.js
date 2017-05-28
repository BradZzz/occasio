// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux"
import { ButtonFlat } from "../../atoms/"
import * as NamespaceActions from "../../../actions/namespace"

export class BackOrderButton extends Component {
  constructor(props) {
    super(props)
//    this.state = {
//      style : this.props.style,
//      name : this.props.name,
//    }
  }

  data = () => {
    const { name } = this.props
    console.log("Clicked: " + name)
    const base = { domName : name }
    if (firebase.auth().currentUser) {
      return Object.assign({}, base, { usrID : firebase.auth().currentUser.uid })
    }
    return base
  }

  action = () => {
    const { dispatch } = this.props
    dispatch(NamespaceActions.queryBackorder(this.data()))
  }

  render() {
    const { style, name } = this.props
    return (
      <div style={ style }>
        <ButtonFlat onClick={ this.action }>
          {this.props.children}
        </ButtonFlat>
      </div>
    )
  }
}

BackOrderButton.propTypes = {
  name: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return { }
}

export default connect(mapStateToProps)(BackOrderButton)