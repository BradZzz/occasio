// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import Helmet from "../../../components/utils/Helmet"

import * as UserActions from "../../../actions/user"

import styles from "./styles.css"
import { Button } from "../../../components/atoms/"
import { LoginPanel } from "../../../components/molecules/"
import TextField from 'material-ui/TextField';
import type { Dispatch } from "redux"

export class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '' ,
      pass: ''
    }
  }

  testLogin = () => {
    const { name, pass } = this.state
    const user = {
      name : name,
      pass : pass
    }
    this.props.dispatch(UserActions.login(user))
    console.log(this.props)
  }

  testLogout = () => {
    this.props.dispatch(UserActions.logout())
    console.log(this.props)
  }

  fieldChange = (event) => {
    console.log(event.target.id)
    console.log(event.target.value)

    this.setState({
      [event.target.id] : event.target.value,
    })
  }

//  render() {
//    const { signedIn, isFetching, meta } = this.props
//    return (
//      <div className={styles.root}>
//        <Helmet title="Login" />
//        <TextField id="name" value={this.state.name} hintText="username" onChange={this.fieldChange} />
//        <TextField id="pass" value={this.state.pass} hintText="password" onChange={this.fieldChange} />
//        <Button onClick={this.testLogin}>Sign In</Button>
//        <Button onClick={this.testLogout}>Sign Out</Button>
//        <p>Fetching: { isFetching.toString() } </p>
//        <p>Signed In: { signedIn.toString() } </p>
//        <p>Result: { meta.first_name } , { meta.last_name } , { meta.email } </p>
//      </div>
//    )
//  }

  render() {
    const { signedIn, isFetching, meta } = this.props
    return (
      <div className={styles.root}>
        <Helmet title="Login" />
        <LoginPanel></LoginPanel>
      </div>
    )
  }

}

LoginPage.propTypes = {
  signedIn: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  meta: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  console.log(state)
  const { signedIn, isFetching, meta } = state.user
  return {
    signedIn,
    isFetching,
    meta,
  }
}

export default connect(mapStateToProps)(LoginPage)