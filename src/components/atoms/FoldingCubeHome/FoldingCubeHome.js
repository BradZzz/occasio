// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux"
import * as UserActions from "../../../actions/user"
import { FoldingCube } from "../../quarks"
import styles from "./styles.css"

export class FoldingCubeHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
          <div className={ styles.root }>
            <FoldingCube/>
          </div>
        )
    }
  }
}

FoldingCubeHome.propTypes = {
  isFetching: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  const { isFetching } = state.p_home
  return {
    isFetching,
  }
}

export default connect(mapStateToProps)(FoldingCubeHome)