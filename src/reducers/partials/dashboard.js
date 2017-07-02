// @flow
import { handleActions } from "redux-actions";
import * as D from "../../actions/partials/dashboard"
import React from "react"

const initialState = {
  pos: 0,
  exp: true,
  cards: [
    {
      title:"Summary",
      sub:"General Information",
      txt:"Click here to see summary statistics for your client providers",
      img:"http://www.material-ui.com/images/nature-600-337.jpg"
    },
    {
      title:"Segmentation",
      sub:"Breakdown by Score",
      txt:"Members broken down by RAF, HCC, Demo, and Recapture scores",
      img:"http://www.material-ui.com/images/nature-600-337.jpg"
    },
    {
      title:"HCC",
      sub:"Breakdown by HCC",
      txt:"Members broken down by RAF, HCC, Demo, and Recapture scores",
      img:"http://www.material-ui.com/images/nature-600-337.jpg"
    },
    {
      title:"Churn",
      sub:"Breakdown by Churn",
      txt:"Member churn broken down by year and month",
      img:"http://www.material-ui.com/images/nature-600-337.jpg"
    },
  ]
}

export default handleActions({
  [D.DASHBOARD_REQUESTED]: (state = { }, action) => ({
    ...state,
    exp: action.payload.exp || false,
    pos: action.payload.pos || state.pos || 0,
  })
}, initialState);