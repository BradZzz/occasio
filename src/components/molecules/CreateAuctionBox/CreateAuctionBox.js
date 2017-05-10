// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux"
import TextField from 'material-ui/TextField';
import { CreateAuctionButton } from "../../molecules/"
import * as AuctionActions from "../../../actions/auction"
import { Button } from "../../atoms/"
import styles from "./styles.css"

export class CreateAuctionBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      minimum: "",
      message: "",
      image: "",
      auctionMsg: props.auctionMsg,
    }
  }

  change = (event) => {
    if ("id" in event.target && "value" in event.target) {
      console.log(event.target.id)
      console.log(event.target.value)
      this.setState({ [event.target.id]: event.target.value })
    }
  }

  data = () => {
    const { name, minimum, message, image } = this.state
    const base = { name : name, minimum : minimum, message : message, image : image }
    if (firebase.auth().currentUser) {
      return Object.assign({}, base, { usrID : firebase.auth().currentUser.uid })
    }
    return base
  }

  action = () => {
    const { name, minimum, message, image } = this.state
    if (name && minimum && message && image && minimum > 0) {
      const { dispatch } = this.props
      console.log(this.data())
      dispatch(AuctionActions.queryCreateAuction(JSON.stringify(this.data())))
    }
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.state.auctionMsg) !== JSON.stringify(nextProps.auctionMsg))
    {
      this.setState({ auctionMsg: nextProps.auctionMsg })
    }
  }

  render() {
    const { auctionMsg } = this.state
    return (
      <div className={ styles.root }>
        <h3>Create Bid</h3>
        <div>Status: <span style={{ color : (auctionMsg.status.toLowerCase() !== 'success' ? "red" : "green") }}>{ auctionMsg.status }</span></div>
        <TextField id="name" value={ this.state.name } floatingLabelText="Domain" onChange={this.change}/><br />
        <TextField id="minimum" type="number" value={ this.state.minimum } floatingLabelText="Minimum" onChange={this.change}/><br />
        <TextField id="message" value={ this.state.message } floatingLabelText="Message" onChange={this.change}/><br />
        <TextField id="image" value={ this.state.image } floatingLabelText="Image" style={{ "marginBottom" : "1em"}} onChange={this.change}/><br />
        <Button onClick={ this.action }>
          Create Auction
        </Button>
      </div>
    )
  }
}

CreateAuctionBox.propTypes = {
  auctionMsg: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  const { auctionMsg } = state.auction
  return {
    auctionMsg,
  }
}

export default connect(mapStateToProps)(CreateAuctionBox)