// @flow
import React, { Component } from "react"
import styles from "./styles.css"

export default class ProfilePage extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var uid = user.uid;
        var providerData = user.providerData;
        user.getToken().then(function(accessToken) {
          document.getElementById('sign-in-status').textContent = 'Signed in';
          document.getElementById('sign-in').textContent = 'Sign out';
          document.getElementById('account-details').textContent = JSON.stringify({
            displayName: displayName,
            email: email,
            emailVerified: emailVerified,
            photoURL: photoURL,
            uid: uid,
            accessToken: accessToken,
            providerData: providerData
          }, null, '  ')
        })
      } else {
        // User is signed out.
        document.getElementById('sign-in-status').textContent = 'Signed out';
        document.getElementById('sign-in').textContent = 'Sign in';
        document.getElementById('account-details').textContent = 'null';
      }
    }, function(error) {
      console.log(error)
    })
  }

  render() {
    return (
      <div className={styles.root}>
        <h1>Welcome to My Awesome App</h1>
        <div id="sign-in-status"></div>
        <div id="sign-in"></div>
        <div id="account-details"></div>
      </div>
    )
  }
}