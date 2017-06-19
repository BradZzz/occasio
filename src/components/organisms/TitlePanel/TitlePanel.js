// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import styles from "./styles.css"

export class TitlePanel extends Component {
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
    const { signedIn } = this.state
    const marquee = 'episource'
    return (
      <div className={styles.root} style={{ display: signedIn ? 'none' : 'block' }}>
        <header>
          <h1 className={styles.title}>{ marquee }</h1>
        </header>
      </div>
    )
  }
}

TitlePanel.propTypes = {
  signedIn: PropTypes.bool.isRequired,
}

function mapStateToProps(state) {
  const { signedIn } = state.user
  return {
    signedIn,
  }
}

export default connect(mapStateToProps)(TitlePanel)