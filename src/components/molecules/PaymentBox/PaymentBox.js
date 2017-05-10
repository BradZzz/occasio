// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux"
import StripeCheckout from 'react-stripe-checkout';
import styles from "./styles.css"

const STRIPE_KEY = "pk_test_Kb9RAAvNkvzhIaw4FJ7htn0V";
const TEST_IMAGE = "https://s-media-cache-ak0.pinimg.com/originals/76/1a/44/761a4478179130535003c8a24cef677b.jpg";
const AMOUNT = 100

export class PaymentBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      amount : props.amount
    }
  }

  onToken = (token) => {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
  }

  render() {
    const { amount } = this.state
    return (
      <div className={ styles.root }>
        <StripeCheckout
          name="Three Comma Co."
          description="Big Data Stuff"
          image={ TEST_IMAGE }
          panelLabel="Give Money"
          amount={ amount || AMOUNT }
          currency="USD"
          token={ this.onToken }
          stripeKey={ STRIPE_KEY } />
      </div>
    )
  }
}

PaymentBox.propTypes = {
  amount: PropTypes.number.isRequired,
}

function mapStateToProps(state) {
  return { }
}

export default connect(mapStateToProps)(PaymentBox)