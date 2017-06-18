// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import styles from "./styles.css"

export class NavPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      signedin: props.signedIn,
    }
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.state.signedIn) !== JSON.stringify(nextProps.signedIn)) // Check if it's a new user, you can also use some unique, like the ID
    {
      this.setState({ signedIn: nextProps.signedIn })
    }
  }

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.navLogo}>
            <img src='./images/logo_nav.png'/>
        </div>
      </div>
    )
  }
}

NavPanel.propTypes = {
  signedIn: PropTypes.bool.isRequired,
}

function mapStateToProps(state) {
  const { signedIn } = state.user
  return {
    signedIn,
  }
}

export default connect(mapStateToProps)(NavPanel)