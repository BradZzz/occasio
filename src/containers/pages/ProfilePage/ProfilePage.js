// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import StripeCheckout from 'react-stripe-checkout';
import { PaymentBox, CreateAuctionBox } from "../../../components/molecules/"
import styles from "./styles.css"


export class ProfilePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      amount : 1000,
    }
  }

  render() {
    const { amount } = this.state
    return (
      <div className={styles.root}>
        <div className={styles.content}>
          <CreateAuctionBox />
          <PaymentBox amount={ amount } />
        </div>
      </div>
    )
  }
}

ProfilePage.propTypes = {
  signedIn: PropTypes.bool.isRequired,
}

function mapStateToProps(state) {
  const { signedIn } = state.user
  return {
    signedIn,
  }
}

export default connect(mapStateToProps)(ProfilePage)