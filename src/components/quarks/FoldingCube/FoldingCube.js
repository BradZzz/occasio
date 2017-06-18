// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux"
import * as UserActions from "../../../actions/user"
import styles from "./styles.css"

export class FoldingCube extends Component {
  constructor(props) {
    super(props)
    this.state = {
      style: props.style,
      isFetching: props.isFetching,
    }
  }

  componentWillReceiveProps(nextProps) {
    if ((JSON.stringify(this.state.isFetching) !== JSON.stringify(nextProps.isFetching))) // Check if it's a new user, you can also use some unique, like the ID
    {
      this.setState({ isFetching: nextProps.isFetching })
    }
  }

  render() {
    const { isFetching } = this.state
    if (!isFetching) {
        return ( <div></div> )
    } else {
        return (
          <div style={ this.state.style } className={ "center" }>
            <div className={ styles.skfoldingcube } >
              <div className={ styles.skcube1 + " " + styles.skcube }></div>
              <div className={ styles.skcube2 + " " + styles.skcube }></div>
              <div className={ styles.skcube4 + " " + styles.skcube }></div>
              <div className={ styles.skcube3 + " " + styles.skcube }></div>
            </div>
          </div>
        )
    }
  }
}

FoldingCube.propTypes = {
  isFetching: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  const { isFetching } = state.user
  return {
    isFetching,
  }
}

export default connect(mapStateToProps)(FoldingCube)