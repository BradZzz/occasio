// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import styles from "./styles.css"
import { FoldingCubeHome } from "../../../../components/atoms"
import { CardPanel, CardExpPanel } from "../../../../components/organisms"

export class DashboardPartial extends Component {
  constructor(props) {
    super(props)
  }

  //Summary / Demographic
  //Segmentation
  //Recapture => goes to the provider panel
  //HCC
  //Churn

//  componentWillReceiveProps(nextProps) {
//    if(JSON.stringify(this.state.exp) !== JSON.stringify(nextProps.exp)) // Check if it's a new user, you can also use some unique, like the ID
//    {
//      this.setState({ exp: nextProps.exp })
//    }
//  }

  mkCard = (card, idx) => {
    return <CardPanel
      key={ idx }
      idx={ idx }
      title={ card.title }
      sub={ card.sub }
      txt={ card.txt }
      img={ card.img } />
  }

  render() {
    const { cards } = this.props
//    if (!exp) {
      return (
        <div className={ styles.root }>
          { cards.map(this.mkCard) }
        </div>
      )
//    } else {
//      return (
//        <div>
//          <CardExpPanel/>
//        </div>
//      )
//    }
  }
}

DashboardPartial.propTypes = {
  cards: PropTypes.array.isRequired
}

function mapStateToProps(state) {
  const { cards } = state.p_dash
  return {
    cards
  }
}

export default connect(mapStateToProps)(DashboardPartial)