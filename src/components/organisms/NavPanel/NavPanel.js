// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import styles from "./styles.css"

import { NavTab } from "../../../components/molecules/"
import { Collapse } from "../../../components/atoms/"

// Home
import ActionHome from 'material-ui/svg-icons/action/home'
//Dashboard
import SocialPoll from 'material-ui/svg-icons/social/poll'
//Campaigns
import ActionWork from 'material-ui/svg-icons/action/work'
//Member Index
import SocialPeople from 'material-ui/svg-icons/social/people'
//Provider Index
import SocialLocationCity from 'material-ui/svg-icons/social/location-city'
//Downloads
import ContentArchive from 'material-ui/svg-icons/content/archive'
import { white } from 'material-ui/styles/colors';

const iStyles = {
  height: 32,
  width: 32,
  position: "relative",
  top: "50%",
  transform: "translateY(-50%)",
}

export class NavPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      signedIn: props.signedIn,
      tabs: props.tabs,
    }
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.state.signedIn) !== JSON.stringify(nextProps.signedIn)) // Check if it's a new user, you can also use some unique, like the ID
    {
      this.setState({ signedIn: nextProps.signedIn })
    }
  }

  tabs = () => {
    const { signedIn, tabs } = this.state
    if (signedIn) {
      return tabs.map( (tab, idx) => {
        return <NavTab key={ idx } idx={ idx } icon={ tab.icon }
            nav={ tab.nav } text={ tab.text }/>
      })
    } else {
      return ( <div></div> )
    }
  }

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.navLogo}>
          <img src='./images/logo_nav.png'/>
        </div>
        { this.tabs() }
      </div>
    )
  }
}

NavPanel.propTypes = {
  tabs: PropTypes.array.isRequired,
  signedIn: PropTypes.bool.isRequired,
}

function mapStateToProps(state) {
  const { tabs } = state.nav
  const { signedIn } = state.user
  return {
    tabs,
    signedIn,
  }
}

export default connect(mapStateToProps)(NavPanel)