// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import styles from "./styles.css"

import { TablePanel } from "../../../../components/molecules"

export class CampaignPartial extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={ styles.root }>
        <TablePanel/>
      </div>
    )
  }
}

CampaignPartial.propTypes = {
  feed: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { feed } = state.p_home
  return { feed }
}

export default connect(mapStateToProps)(CampaignPartial)