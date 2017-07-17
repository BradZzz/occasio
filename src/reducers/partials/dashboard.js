// @flow
import { handleActions } from "redux-actions";
import React from "react"
import * as D from "../../actions/partials/dashboard"

import { SECTION_COLORS, INFO_CHART_TEST, DRILL_BAR_TEST, LINE_CHART_TEST, DONUT_CHART_TEST } from "../../constants/application"
import { DrillDownPanel, DonutPanel, InfoPanel, LinePanel } from "../../components/molecules"

const sampleBar = DRILL_BAR_TEST
const sampleInfo = INFO_CHART_TEST
const sampleLine = LINE_CHART_TEST
const sampleDonut = DONUT_CHART_TEST

const initialState = {
  pos: 0,
  exp: false,
  cards: [
    {
      title: "Summary",
      sub: "General Information",
      txt: "Click here to see summary statistics for your client providers",
      img: "",
      color: SECTION_COLORS[3],
      cont: (
        <div>
          <DrillDownPanel title="Captured vs. Projected RAF by Year" sub="RAF by Year" data={ sampleBar } width={ 500 } height={ 300 } />
          <InfoPanel width={ 300 } title="Eligible Members" sub="" data={ sampleInfo }/>
        </div>)
    },
    {
      title: "Segmentation",
      sub: "Breakdown by Score",
      txt: "Members broken down by RAF, HCC, Demo, and Recapture scores",
      img: "",
      color: SECTION_COLORS[0],
      cont: (
        <div>
          <DrillDownPanel title="Captured vs. Projected RAF by Year" sub="RAF by Year" data={ sampleBar } width={ 500 } height={ 300 } />
          <LinePanel title="Line Chart" sub="Lines in lines" data={ sampleLine } width={ 600 } height={ 300 }/>
        </div>
        )
    },
    {
      title: "HCC",
      sub: "Breakdown by HCC",
      txt: "Members broken down by RAF, HCC, Demo, and Recapture scores",
      img: "",
      color: SECTION_COLORS[5],
      cont: (<DrillDownPanel title="Captured vs. Projected RAF by Year" sub="RAF by Year" data={ sampleBar } width={ 500 } height={ 300 } />)
    },
    {
      title: "Churn",
      sub: "Breakdown by Churn",
      txt: "Member churn broken down by year and month",
      img: "",
      color: SECTION_COLORS[8],
      cont: (
        <div>
          <DrillDownPanel title="Captured vs. Projected RAF by Year" sub="RAF by Year" data={ sampleBar } width={ 500 } height={ 300 } />
          <DonutPanel title="Some Chart" sub="some sub" data={ sampleDonut } width={ 300 } height={ 400 } />
        </div>
      )
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