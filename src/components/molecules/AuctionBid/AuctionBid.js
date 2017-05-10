// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { BackButton } from "../../../components/molecules/"
import { AuctionImg, Countdown, Button } from "../../../components/atoms/"
import * as BidActions from "../../../actions/bids"
import TextField from 'material-ui/TextField'
import styles from "./styles.css"

const buttonStyle = { }

export class AuctionBid extends Component {
  constructor(props) {
    super(props)
    this.state = {
      specific : props.specific,
      metaCB : props.metaCB,
      disclaimer : "Be careful before clicking the button below. All bids are tied to personal accounts and legally binding. " +
        "For questions/concerns feel free to review our terms and conditions located here.",
      bid : this.top() + 1,
    }
  }

  top = () => {
    const { bidmap, specific } = this.props
    let top = specific.minimum
    if ("_id" in specific && specific._id in bidmap) {
      top = Math.max.apply( Math, bidmap[specific._id].map(function(o){ return o.amount }) )
    }
    return top
  }

  change = (event) => {
    if ("id" in event.target && "value" in event.target) {
      this.setState({ [event.target.id]: event.target.value })
    }
  }

  data = () => {
    const { specific, bid } = this.state
    const base = { domID : specific._id, amount : parseInt(bid) }
    if (firebase.auth().currentUser) {
      return Object.assign({}, base, { usrID : firebase.auth().currentUser.uid })
    }
    return base
  }

  confirm = () => {
    const { dispatch } = this.props
    const { bid } = this.state
    const top = this.top()

    console.log(bid)
    console.log(top)

    if (parseInt(bid) > top) {
      dispatch(BidActions.queryCreateBids(this.data()))
    } else {
      alert("Please enter a number higher than the current bid amount")
    }
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.state.specific) !== JSON.stringify(nextProps.specific))
    {
      this.setState({ specific: nextProps.specific })
      this.setState({ bid: 0 })
    }
    if(JSON.stringify(this.state.metaCB) !== JSON.stringify(nextProps.metaCB))
    {
      this.setState({ metaCB: nextProps.metaCB })
      console.log(nextProps.metaCB)
      if ('status' in nextProps.metaCB) {
        const { dispatch } = this.props
        //Show status of bids to user
        alert(nextProps.metaCB.status)
        //Refresh the bids
        dispatch(BidActions.queryBids({ }))
      }
    }
  }

  render() {
    const { specific, disclaimer } = this.state
    return (
      <div className={ styles.root }>
        <div style={{ 'marginBottom': '1em' }}>
          <BackButton redirect="auction_spec" style={ buttonStyle }>Back</BackButton>
        </div>
        <h1>{ specific.name }</h1>
        <div style={{ width : "30%", float : "left" }} className={ styles.flexR }>
          <AuctionImg></AuctionImg>
        </div>
        <div style={{ 'border' : '1px solid #000', 'padding' : '10px', width : "50%", float : "left", height : "280px", position : "relative" }} className={ styles.flexC }>
          <div style={{ marginBottom : '10px' }}>
            <h3 style={{ marginBottom: ".5em" }}>Bid</h3>
            <TextField id="bid" type="number" value={ this.state.bid } floatingLabelText="Your Bid" onChange={this.change}/>
            <div style={{ 'margin': '1em 0' }}>Confirm: ${ this.state.bid }</div>
            <div style={{ 'width': '100%', marginBottom: ".5em", "fontSize" : ".7em" }}> { disclaimer } </div>
          </div>
          <div style={{ "position" : "absolute", "bottom" : "1em" }}>
            <Button onClick={ this.confirm }>Confirm Bid</Button>
          </div>
        </div>
      </div>
    )
  }
}

AuctionBid.propTypes = {
  specific: PropTypes.object.isRequired,
  bidmap: PropTypes.object.isRequired,
  metaCB: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  const { specific } = state.auction
  const { meta : bidmap, metaCB } = state.bids
  return {
    specific,
    bidmap,
    metaCB,
  }
}

export default connect(mapStateToProps)(AuctionBid)