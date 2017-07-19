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

  mkCard = (card, idx) => {
    return <CardPanel
      key={ idx }
      idx={ idx }
      title={ card.title }
      sub={ card.sub }
      txt={ card.txt }
      img={ card.img }
      color={ card.color }
      cont={ card.cont }/>
  }

  render() {
    const { cards } = this.props
    return (
      <div className={ styles.root }>
        { cards.map(this.mkCard) }
        <div style={{ "marginBottom" : "70px", "width" : "100%" }}></div>
      </div>
    )
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