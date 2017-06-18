// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux"
import * as UserActions from "../../../actions/user"
import AUTH from "../../../firebase/auth"
import styles from "./styles.css"

export class Login extends Component {
  constructor(props) {
    super(props)
    console.log(props)

    this.state = {
      signedin: props.signedIn,
      auth: AUTH,
    }
//    const { dispatch } = props
//    dispatch(UserActions.auth({ auth : this.state.auth }))

    this.uiConfig = {
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID
      ],
      // Terms of service url.
      tosUrl: 'http://google.com'
    }
  }

  componentWillReceiveProps(nextProps) {
    if ((JSON.stringify(this.state.signedIn) !== JSON.stringify(nextProps.signedIn))) // Check if it's a new user, you can also use some unique, like the ID
    {
      this.setState({ signedIn: nextProps.signedIn })
      if (!nextProps.signedIn) {
        this.state.auth.reset()
        this.reset()
      }
    }
  }

  click = () => {
    const { dispatch } = this.props
    dispatch(UserActions.requestLogin({}))
    console.log("Click")
  }

  reset = () => {
    const { dispatch } = this.props
    this.state.auth.start('#firebaseui-auth-container', this.uiConfig)
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        user.getToken().then(function(accessToken) {
          dispatch(UserActions.login({
            name: user.displayName,
            email: user.email,
            emailV: user.emailVerified,
            photoURL: user.photoURL,
            uid: user.uid,
            accessToken: accessToken,
            providerData: user.providerData
          }))
        })
      } else {
        dispatch(UserActions.logout())
      }
    }, function(error) {
      console.log(error)
    })
  }

  componentDidMount() {
    this.reset()
  }

  render() {
    return (
      <div className={ "center" }>
        <div id="firebaseui-auth-container"></div>
      </div>
    );
  }
}

Login.propTypes = {
  signedIn: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { signedIn } = state.user
  return {
    signedIn,
  }
}

export default connect(mapStateToProps)(Login)