// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { AuctionPanel } from "../../../components/organisms/"
import styles from "./styles.css"

export class AuctionPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.content}>
          <AuctionPanel></AuctionPanel>
        </div>
      </div>
    )
  }
}

AuctionPage.propTypes = {
  signedIn: PropTypes.bool.isRequired,
}

function mapStateToProps(state) {
  const { signedIn } = state.user
  return {
    signedIn,
  }
}

export default connect(mapStateToProps)(AuctionPage)