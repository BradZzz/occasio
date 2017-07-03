// @flow
import { handleActions } from "redux-actions";
import * as D from "../../actions/partials/dashboard"
import React from "react"

const initialState = {
  pos: 0,
  exp: false,
  cards: [
    {
      title:"Summary",
      sub:"General Information",
      txt:"Click here to see summary statistics for your client providers",
      img:"https://previews.123rf.com/images/stockbroker/stockbroker0910/stockbroker091000014/5632070-Stock-Traders-At-Work-Stock-Photo-trader-broker.jpg"
    },
    {
      title:"Segmentation",
      sub:"Breakdown by Score",
      txt:"Members broken down by RAF, HCC, Demo, and Recapture scores",
      img:"http://www.tradingacademy.com/assets/images/fec/how-stock-market-works.jpg"
    },
    {
      title:"HCC",
      sub:"Breakdown by HCC",
      txt:"Members broken down by RAF, HCC, Demo, and Recapture scores",
      img:"https://thumbs.dreamstime.com/z/old-doctor-standing-mri-room-hospital-front-holding-tablet-smiling-35113023.jpg"
    },
    {
      title:"Churn",
      sub:"Breakdown by Churn",
      txt:"Member churn broken down by year and month",
      img:"https://previews.123rf.com/images/alexraths/alexraths1102/alexraths110200008/8800806-doctor-or-nurse-talking-to-patient-lying-in-bed-in-hospital-Stock-Photo.jpg"
    },
  ]
}

export default handleActions({
  [D.DASHBOARD_REQUESTED]: (state = { }, action) => ({
    ...state,
    exp: action.payload.exp || false,
    pos: action.payload.pos || 0,
  })
}, initialState);