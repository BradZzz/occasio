// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import styles from "./styles.css"
import { BackButton, BackOrderButton } from "../../../components/molecules/"

export class TitlePanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      signedin: props.signedIn,
      details: props.details,
      isFetching: props.isFetching,
      name: props.name,
    }
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.state.signedIn) !== JSON.stringify(nextProps.signedIn)) // Check if it's a new user, you can also use some unique, like the ID
    {
      this.setState({ signedIn: nextProps.signedIn })
    }
    if(JSON.stringify(this.state.details) !== JSON.stringify(nextProps.details))
    {
      this.setState({ details: nextProps.details })
    }
    if(JSON.stringify(this.state.isFetching) !== JSON.stringify(nextProps.isFetching))
    {
      this.setState({ isFetching: nextProps.isFetching })
    }
    if(JSON.stringify(this.state.name) !== JSON.stringify(nextProps.name))
    {
      this.setState({ name: nextProps.name })
    }
  }

  render() {
    const { signedIn, details, isFetching, name } = this.state
    const alt = details && !isFetching
    return (
      <div className={styles.root} style={{
        padding: signedIn ? '1.8em 0' : '5em 0',
        height: signedIn ? '100px' : '200px',
      }}>
        <header>
          <div style={{ visibility: alt ? 'visible' : 'hidden' }}>
            <h1 className={styles.title}>{ name }</h1>
          </div>
          <div style={{ visibility: !alt ? 'visible' : 'hidden', 'display': 'none' }}>
            <h1 className={styles.title}>occas.io</h1>
          </div>
          <div className={styles.bPanel} style={{ visibility: alt ? 'visible' : 'hidden' }}>
            <BackButton redirect="domain" style={{ 'width' : 150, 'display' : 'flex' }}>Back</BackButton>
            <BackOrderButton name={ name } style={{ 'width' : 150, 'display' : 'flex' }}>BackOrder</BackOrderButton>
          </div>
        </header>
      </div>
    )
  }
}

TitlePanel.propTypes = {
  signedIn: PropTypes.bool.isRequired,
  details: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
}

function mapStateToProps(state) {
  const { signedIn } = state.user
  const { details, isFetching, specific : name } = state.domain
  return {
    signedIn,
    details,
    isFetching,
    name,
  }
}

export default connect(mapStateToProps)(TitlePanel)