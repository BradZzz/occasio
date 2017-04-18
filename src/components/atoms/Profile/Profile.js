// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
//import * as UserActions from "../../../actions/user"
import * as DomainActions from "../../../actions/domain"
import Infinite from 'react-infinite'

export class Profile extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(DomainActions.queryDomains({ period : 30 }))
  }

  renderField = (dom, idx) => {
    return (
      <div key={dom._id}>{dom.name} - {dom.expires}</div>
    )
  }

  render() {
    const { isFetching, meta } = this.props
    return (
      <div>
        <div>Fetching: { isFetching.toString() }</div>
        <Infinite containerHeight={200} elementHeight={40}>
          { meta.map(this.renderField) }
        </Infinite>
      </div>
    )
  }
}

Profile.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  meta: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { isFetching, meta } = state.domain
  return {
    isFetching,
    meta,
  }
}

export default connect(mapStateToProps)(Profile)