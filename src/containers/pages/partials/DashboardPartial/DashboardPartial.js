// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import styles from "./styles.css"
import { FoldingCubeHome } from "../../../../components/atoms"
import { CardPanel, CardExpPanel } from "../../../../components/organisms"

export class DashboardPartial extends Component {
  constructor(props) {
    super(props)
    this.state = {
      exp: props.exp,
    }
  }

  //Summary / Demographic
  //Segmentation
  //Recapture => goes to the provider panel
  //HCC
  //Churn

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.state.exp) !== JSON.stringify(nextProps.exp)) // Check if it's a new user, you can also use some unique, like the ID
    {
      this.setState({ exp: nextProps.exp })
    }
  }

  mkCard = (card, idx) => {
    return <CardPanel
      idx={ idx }
      title={ card.title }
      sub={ card.sub }
      txt={ card.txt }
      img={ card.img } />
  }

  render() {
    const { exp } = this.state
    const { cards } = this.props
    if (!exp) {
      return (
        <div>
          { cards.map(this.mkCard) }
        </div>
      )
    } else {
      return (
        <div>
          <CardExpPanel/>
        </div>
      )
    }
  }
}

DashboardPartial.propTypes = {
  exp: PropTypes.bool.isRequired,
  cards: PropTypes.array.isRequired,
}

function mapStateToProps(state) {
  const { exp, cards } = state.p_dash
  return {
    exp,
    cards,
  }
}

export default connect(mapStateToProps)(DashboardPartial)