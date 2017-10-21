// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux"
import * as UserActions from "../../../actions/user"
import { FoldingCube } from "../../quarks"
import styles from "./styles.css"

export class FoldingCubeBookDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isFetchingSearch: props.isFetchingSearch,
    }
  }

  componentWillReceiveProps(nextProps) {
    if ((JSON.stringify(this.state.isFetchingSearch) !== JSON.stringify(nextProps.isFetchingSearch))) // Check if it's a new user, you can also use some unique, like the ID
    {
      this.setState({ isFetchingSearch: nextProps.isFetchingSearch })
    }
  }

  render() {
    const { isFetchingSearch } = this.state
    if (!isFetchingSearch) {
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

FoldingCubeBookDetails.propTypes = {
  isFetchingSearch: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  const { isFetchingSearch } = state.books
  return { isFetchingSearch }
}

export default connect(mapStateToProps)(FoldingCubeBookDetails)