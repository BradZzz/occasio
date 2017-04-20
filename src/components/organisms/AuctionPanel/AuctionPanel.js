// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import * as AuctionActions from "../../../actions/auction"
import { AuctionList, AuctionSpecific } from "../../../components/molecules/"
import styles from "./styles.css"

export class AuctionPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      details: props.details
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(AuctionActions.queryAuctions())
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.state.details) !== JSON.stringify(nextProps.details))
    {
      this.setState({ details: nextProps.details })
    }
  }

  render() {
    return (
      <div className={styles.root + ' columnFlex'} >
        <div style={{ display: !this.state.details ? 'block' : 'none' }}>
          <AuctionList></AuctionList>
        </div>
        <div style={{ display: this.state.details ? 'block' : 'none' }}>
          <AuctionSpecific></AuctionSpecific>
        </div>
      </div>
    )
  }

}

AuctionPanel.propTypes = {
  details: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  const { details } = state.auction
  return {
    details,
  }
}

export default connect(mapStateToProps)(AuctionPanel)