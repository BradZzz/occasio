// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux"
import * as UserActions from "../../../actions/user"
import { FoldingCube } from "../../quarks"
import styles from "./styles.css"

export class FoldingCubeMain extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isFetchingU: props.isFetchingU,
      isFetchingM: props.isFetchingM,
      isFetchingP: props.isFetchingP,
    }
  }

  componentWillReceiveProps(nextProps) {
    if ((JSON.stringify(this.state.isFetchingU) !== JSON.stringify(nextProps.isFetchingU))) // Check if it's a new user, you can also use some unique, like the ID
    {
      this.setState({ isFetchingU: nextProps.isFetchingU })
    }
    if ((JSON.stringify(this.state.isFetchingM) !== JSON.stringify(nextProps.isFetchingM))) // Check if it's a new user, you can also use some unique, like the ID
    {
      this.setState({ isFetchingM: nextProps.isFetchingM })
    }
    if ((JSON.stringify(this.state.isFetchingP) !== JSON.stringify(nextProps.isFetchingP))) // Check if it's a new user, you can also use some unique, like the ID
    {
      this.setState({ isFetchingP: nextProps.isFetchingP })
    }
  }

  render() {
    const { isFetchingU, isFetchingM, isFetchingP } = this.state
    if (!isFetchingU && !isFetchingM && !isFetchingP) {
        return (
          <div className={ styles.root }>
            {this.props.children}
          </div>
        )
    } else {
        return (
          <div className={ styles.root + " " + styles.marginT }>
            <FoldingCube/>
          </div>
        )
    }
  }
}

FoldingCubeMain.propTypes = {
  isFetchingU: PropTypes.bool.isRequired,
  isFetchingM: PropTypes.bool.isRequired,
  isFetchingP: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  const { isFetching:isFetchingU } = state.user
  const { isFetching:isFetchingM } = state.m_members
  const { isFetching:isFetchingP } = state.m_providers

  return {
    isFetchingU,
    isFetchingM,
    isFetchingP,
  }
}

export default connect(mapStateToProps)(FoldingCubeMain)