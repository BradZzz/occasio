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
      isFetchingSearchComp: props.isFetchingSearchComp
    }
  }

  componentWillReceiveProps(nextProps) {
    if ((JSON.stringify(this.state.isFetchingSearch) !== JSON.stringify(nextProps.isFetchingSearch))) // Check if it's a new user, you can also use some unique, like the ID
    {
      this.setState({ isFetchingSearch: nextProps.isFetchingSearch })
    }
    if ((JSON.stringify(this.state.isFetchingSearchComp) !== JSON.stringify(nextProps.isFetchingSearchComp))) // Check if it's a new user, you can also use some unique, like the ID
    {
      this.setState({ isFetchingSearchComp: nextProps.isFetchingSearchComp })
    }
  }

  render() {
    const { isFetchingSearch, isFetchingSearchComp } = this.state
    if (!isFetchingSearch && !isFetchingSearchComp) {
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
  isFetchingSearch: PropTypes.bool.isRequired,
  isFetchingSearchComp: PropTypes.bool.isRequired,
}

function mapStateToProps(state) {
  const { isFetchingSearch, isFetchingSearchComp } = state.books
  return { isFetchingSearch, isFetchingSearchComp }
}

export default connect(mapStateToProps)(FoldingCubeBookDetails)